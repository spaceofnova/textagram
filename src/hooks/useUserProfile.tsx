import { UserContext } from "../providers/UserProvider";
import { useContext } from "react";

export const useUserProfile = () => {
  const { userProfile, triggerProfileUpdate } = useContext(UserContext);
  if (!userProfile) {
    triggerProfileUpdate();
  }
  return { userProfile, triggerProfileUpdate };
};
