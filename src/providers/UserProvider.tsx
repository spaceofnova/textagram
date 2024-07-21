import supabase from "../utils/supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase()
      .auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });

    const {
      data: { subscription },
    } = supabase().auth.onAuthStateChange((_event, session) => {
      if (session?.user === null) {
        navigate("/login");
      }
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
