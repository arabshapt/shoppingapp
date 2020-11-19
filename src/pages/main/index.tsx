import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import { UserContext } from "../../userProvider";
import { signInWithGoogle } from "../../firebase";
const MainPage = () => {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState<string | null>(null);
console.log(user);

  useEffect(() => {
    if (!user) {
      setredirect("/");
    }
  }, [user]);
  if (redirect) {
    console.log(redirect);
    
    
    return <Redirect to={redirect} />;
  }
    return (
      <div>
        <Typography>main page</Typography>
        <Button onClick={signInWithGoogle}>Login</Button>
      </div>
    );
};
export default MainPage;
