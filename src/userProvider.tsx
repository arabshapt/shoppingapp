import React, { useState, useEffect, createContext } from "react";
import { auth } from "./firebase";
export const UserContext = createContext({ user: null });
const UserProvider = (props: { children: any }) => {
  const [user, setuser] = useState<any>(
    localStorage.getItem("myPage.expectSignIn")
      ? { displayName: localStorage.getItem("myPage.expectSignIn") }
      : null
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("myPage.expectSignIn", user?.displayName ?? "");
      } else {
        localStorage.removeItem("myPage.expectSignIn");
      }
      const { displayName } = user || {};
      setuser(
        user
          ? {
              displayName,
            }
          : null
      );
    });
  }, [setuser]);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
