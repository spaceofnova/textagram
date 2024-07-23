import supabase from "../utils/supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<{
  user: User | null;
  userProfile: UserProfile | null;
  setUser: (user: User | null) => void;
  triggerProfileUpdate: () => void;
}>({
  user: null,
  setUser: () => {},
  userProfile: null,
  triggerProfileUpdate: () => {},
});

export interface UserProfile {
  username: string;
  display_name: string;
  pronouns: string;
  bio: string;
  posts: string[];
  avatar: {
    small: string;
    large: string;
  };
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const triggerProfileUpdate = () => {
    supabase()
      .from("profiles")
      .select("*")
      .eq("username", user?.user_metadata.username)
      .single()
      .then(({ data }) => {
        setUserProfile(data);
      });
  };

  useEffect(() => {
    supabase()
      .auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });

    const {
      data: { subscription },
    } = supabase().auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (
        session?.user === null ||
        session?.user === undefined ||
        !session?.user.id
      ) {
        navigate("/login");
      } else {
        supabase()
          .from("profiles")
          .select("*")
          .eq("username", session?.user.user_metadata.username)
          .single()
          .then(({ data }) => {
            setUserProfile(data);
          });
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, userProfile, triggerProfileUpdate }}
    >
      {children}
    </UserContext.Provider>
  );
}
