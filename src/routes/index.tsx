import React, { useEffect, useState } from "react";
import Box from '@material-ui/core/Box';
import SignIn from './auth';
import { getCurrentUser } from "../api/user.service";
import User from "../types/user";
import Home from "./home";
import { getSession } from "../api/session-storage";
import { CssBaseline, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0ff'
  }
}));

const App = () => {
  const classes = useStyles();
  const [user, setUser] = useState<User | boolean>(false);

  // When first load restore session if available
  useEffect(() => {
    document.title = `Login-App`;
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const session = getSession();
    console.log('fetchUser ~ session', session)
    if (session && session.jwt) {
      const user = await getCurrentUser();
      window.history.replaceState(window.history.state, 'Profile', '/profile');
      return setUser(user);
    }
    if (session && session.google) {
      window.history.replaceState(window.history.state, 'Profile', '/profile');
      return setUser(true);
    }
    return window.history.replaceState(window.history.state, 'Login', '/login');
  };
  
  const logout = async () => {
    const auth2 = gapi.auth2.getAuthInstance();
    await auth2.signOut()
    setUser(null)
  };

  // Here comes router component, but for now just login / home
  return (
    <>
      <CssBaseline />
      <Box className={classes.root}>
        {user ? (
          <Home user={user} removeUser={logout}/>
        ) : (
          <SignIn user={user}/>
        )
        }
      </Box>
    </>
  );
}
export default App;