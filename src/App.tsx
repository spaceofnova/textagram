import { Outlet } from "react-router-dom";
import Navigator from "./components/Navigator";
import { useEffect, useState } from "react";
import UserProvider from "./providers/UserProvider";
import supabase from "./utils/supabase";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase().from("posts").select("*");
      setData(data);
    };
    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  const refresh = async () => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase().from("posts").select("*");
      setData(data);
    };
    fetchData().then(() => {
      setLoading(false);
    });
  };

  return (
    <UserProvider>
      <div className="flex flex-col h-screen w-screen">
        <div className="w-full h-full overflow-y-scroll overflow-x-hidden mb-12">
          <Outlet context={{ data, loading, refresh }} />
        </div>
        <Navigator />
      </div>
    </UserProvider>
  );
}

export default App;
