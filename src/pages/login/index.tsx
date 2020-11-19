import React, { useContext, useEffect, useState } from "react";
import { signInWithGoogle } from "../../firebase";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../userProvider";

const LoginPage = () => {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState<string | null>(null);
console.log(user);

  useEffect(() => {
    if (user) {
      setredirect("/mainpage");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div className="login-buttons">
      <button className="login-provider-button" onClick={signInWithGoogle}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span> Continue with Google</span>
      </button>
    </div>
  );
};

export default LoginPage;
