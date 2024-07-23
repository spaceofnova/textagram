import { LogOutIcon } from "lucide-react";
import supabase from "../utils/supabase";

export default function OptionsPage() {
  const handleLogout = async () => {
    await supabase().auth.signOut();
  };
  return (
    <>
      <div className="p-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Options</h1>
        <button className="text-red-500 font-bold p-2" onClick={handleLogout}>
          <LogOutIcon />
        </button>
      </div>
    </>
  );
}
