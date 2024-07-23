import { Link, Outlet } from "react-router-dom";
import Navigator from "./components/Navigator";
import { useEffect, useState } from "react";
import UserProvider from "./providers/UserProvider";
import supabase from "./utils/supabase";
import Popover from "./components/Popover";

const consoleWarning = () => {
  console.log("%cStop!", "color: red; font-size: 40px");
  console.log(
    `%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable an Textagram feature or "hack" someone's account, it is a scam and will give them access to your Textagram account.`,
    "font-size: 20px"
  );
};
function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    consoleWarning();
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase()
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      setData(data);
    };
    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  const refresh = async () => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase()
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      setData(data);
    };
    fetchData().then(() => {
      setLoading(false);
    });
  };

  return (
    <UserProvider>
      <Popover dismissable={true} onlyShowOnce={true}>
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center text-center">
          <h1 className="text-3xl font-bold">Display Names!</h1>
          <p>Customize your account by adding a display name!</p>
          <Link to="/profile" className="text-primary font-bold text-blue-400">
            Go to profile
          </Link>
        </div>
      </Popover>
      <div
        className="flex flex-col h-screen w-screen App"
        id="popover-zoom-out"
      >
        <div className="w-full h-full overflow-y-scroll overflow-x-hidden mb-12">
          <Outlet context={{ data, loading, refresh }} />
        </div>
        <Navigator />
      </div>
    </UserProvider>
  );
}

export default App;
