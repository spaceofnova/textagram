import supabase from "./supabase";

async function checkIfProfileExists(email: string) {
  const { data, error } = await supabase()
    .from("profiles")
    .select("username")
    .eq("email", email);
  if (error) {
    return console.log(error);
  }
  if (data.length === 0) {
    return false;
  } else {
    return true;
  }
}

async function checkIfUsernameExists(username: string) {
  const { data, error } = await supabase()
    .from("profiles")
    .select("username")
    .eq("username", username);
  if (error) {
    return console.log(error);
  }
  if (data.length === 0) {
    return false;
  } else {
    return true;
  }
}

export async function login(event: React.SyntheticEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;
  const formElements = form.elements as typeof form.elements & {
    email: { value: string };
    password: { value: string };
  };
  const { error } = await supabase().auth.signInWithPassword({
    email: formElements.email.value,
    password: formElements.password.value,
  });

  if (error && error !== null) {
    return console.log(error);
  } else {
    const { data } = await supabase().auth.getUser();

    const profileExists = await checkIfProfileExists(
      data.user?.user_metadata?.email
    );
    if (profileExists) {
      return (window.location.href = "/");
    } else {
      await supabase()
        .from("profiles")
        .insert([
          {
            username: data.user?.user_metadata?.username,
          },
        ]);

      return (window.location.href = "/");
    }
  }
}

export async function register(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const formElements = form.elements as typeof form.elements & {
    email: { value: string };
    password: { value: string };
    username: { value: string };
  };
  if (await checkIfUsernameExists(formElements.username.value)) {
    return alert("Username already exists");
  }
  const { error } = await supabase().auth.signUp({
    email: formElements.email.value,
    password: formElements.password.value,
    options: {
      data: {
        username: formElements.username.value,
      },
    },
  });

  if (error) {
    return console.log(error);
  } else {
    await supabase()
      .from("profiles")
      .insert([
        {
          username: formElements.username.value,
        },
      ]);
    return (window.location.href = "/");
  }
}

export const handleLogout = async () => {
  await supabase().auth.signOut();
};
