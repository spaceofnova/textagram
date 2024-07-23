import supabase from "../utils/supabase";
import { useUserProfile } from "../hooks/useUserProfile";
import { useUser } from "../hooks/useUser";

export default function ProfileEdit() {
  const { userProfile, triggerProfileUpdate } = useUserProfile();
  const user = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const display_name = (
      document.getElementById("Display Name") as HTMLInputElement
    )?.value;
    const bio = (document.getElementById("Bio") as HTMLInputElement)?.value;
    const pronouns = (document.getElementById("pronouns") as HTMLInputElement)
      ?.value;
    const { data, error } = await supabase()
      .from("profiles")
      .update({
        display_name: display_name,
        bio: bio,
        pronouns: pronouns,
      })
      .eq("uuid", user?.id);

    if (error) {
      alert("Error updating profile");
    } else {
      alert("Profile updated successfully");
      triggerProfileUpdate();
    }

    console.log(data);
  };
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-16">Edit Profile</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="Display Name">Display Name</label>
        <input
          type="text"
          id="Display Name"
          placeholder="Display Name"
          className="p-2 rounded-md bg-white/10"
          defaultValue={userProfile?.display_name ?? ""}
        />
        <label htmlFor="Bio">Bio</label>
        <textarea
          id="Bio"
          placeholder="Bio"
          className="p-2 rounded-md bg-white/10"
          defaultValue={userProfile?.bio}
        ></textarea>
        <label htmlFor="pronouns">Pronouns</label>
        <input
          type="text"
          id="pronouns"
          placeholder="Pronouns"
          className="p-2 rounded-md bg-white/10"
          defaultValue={userProfile?.pronouns}
        />

        <button className="w-full bg-white/10 p-2 rounded-md">Save</button>
      </form>
    </div>
  );
}
