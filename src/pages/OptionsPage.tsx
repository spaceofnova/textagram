import supabase from "../utils/supabase";

export default function OptionsPage() {
  const handleLogout = async () => {
    await supabase().auth.signOut();
  };
  return (
    <>
      <div className="p-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Textagram Options</h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}
