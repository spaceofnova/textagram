import supabase from "./supabase";

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
  }
  return (window.location.href = "/");
}

export async function register(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const formElements = form.elements as typeof form.elements & {
    email: { value: string };
    password: { value: string };
    username: { value: string };
  };
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
    return (window.location.href = "/");
  }
}
