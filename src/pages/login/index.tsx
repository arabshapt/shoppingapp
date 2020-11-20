import React, { useContext, useEffect, useState } from "react";
import { signInWithGoogle, auth, firebaseUIConfig } from "../../firebase";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../userProvider";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const LoginPage = () => {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState<string | null>(null);
  console.log(user);

  useEffect(() => {
    if (user) {
      setredirect("/");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
    </div>
  );
};

export default LoginPage;
