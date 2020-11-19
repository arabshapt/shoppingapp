import React, { useState, useEffect, createContext } from "react";
import { auth } from "./firebase";
export const UserContext = createContext({ user: null });
const UserProvider = (props: { children: any }) => {
  const [user, setuser] = useState<any>(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const { displayName, email } = user || {};
      setuser(
        user
          ? {
              displayName,
              email,
            }
          : null
      );
    });
  }, []);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
