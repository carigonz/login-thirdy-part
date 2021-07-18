import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Logo from '../../resources/logo';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import loginUser from "../../api/auth.service";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import Home from '../home'
import { InputAdornment } from '@material-ui/core';
import { Login } from './gmail/login';
import User from '../../types/user';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Copyright: React.FC<{}> = () => {
  return (
    <Typography variant="body2" color="textPrimary" align="center" >
      {'Copyright © '}
      <Link href="https://www.linkedin.com/in/carigonz/" color="textPrimary">
        carigonz
      </Link>
      {`  ${new Date().getFullYear()}.`}
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0ff'
  },
  loginContainer: {
    padding: theme.spacing(4,4),
    height: '570px',
    width: '540px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    color: '#000000',
    borderRadius: '20px'
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%', // Fix IE 11 issue.
  },
  row: {
    marginTop: theme.spacing(2),
  },
  button: {
    textTransform: 'none',
    width: '150px',
    padding: theme.spacing(1.5),
  },
  logo: {
    margin: theme.spacing(1),
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  signup: {
    cursor: 'pointer'
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: theme.spacing(5),
  },
  white: {
    color: '#fff',
  },
  error: {
    color: '#ff2212',
    borderRadius: '5px',
    border: '1px solid #ff2212',
    padding: '5px 12px'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  line: {
    width: '40%',
    backgroundColor: '#EFF3F6',
    height: '1px'
  },
  gmailButton: {
    backgroundColor: theme.palette.secondary.main,
    height: '56px',
    cursor: 'pointer',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

interface PropTypes {
  user?: User | boolean;
}
export default function SignIn({ user }: PropTypes) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<User | boolean>(user);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('No user found with this credentials');

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length && email.length) {
      login();
    }
  };

  const login = async () => {
    try {
      const user = await loginUser(email, password);
      setCurrentUser(user)
      window.history.replaceState(window.history.state, 'Profile', '/profile');
      console.log('login was awesome');
      
    } catch (error) {
      console.log(error);
      showError('No user found with this credentials');
    }
  }

  const showError = (message:string) => {
    setErrorMessage(message);
    setError(true);
  }

  const logout = () => setCurrentUser(null);

  const googleAccess = () => setCurrentUser(true);

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      const email: string = e.target.value;
    if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      setError(false);
      setEmail(email);
    } else {
      showError('Email is invalid');
    }
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setPassword(e.target.value);
    }

  return (
    <Grid container component="main" className={classes.root}>
      { !currentUser ? (
          <>
              <Grid className={classes.loginContainer} component={Paper} item xs={12} sm={8} md={5} square elevation={4}>
                <div className={classes.logo}>
                  <Logo />
                </div>
                <form className={classes.form}>
                  <Typography variant="h5" gutterBottom className={classes.bold}>
                    Sign in with
                  </Typography>
                  <Login class={classes.gmailButton} text={classes.white} onAccess={googleAccess}/>
                  <div className={classes.divider}>
                    <span className={classes.line}/>
                    <span style={{color: '#B2B5C9' }}>Or</span>
                    <span className={classes.line}/>
                  </div>
                    <Grid item className={classes.row}>
                      {error &&
                        <Typography variant="subtitle2" gutterBottom className={classes.error}>
                          {errorMessage}
                        </Typography>
                      }
                      <label>Email Address</label>
                      <TextField
                        variant="outlined"
                        error={error}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AlternateEmailIcon color="disabled"/>
                            </InputAdornment>
                          ),
                        }}
                        onChange={ (event: any) => handleEmailChange(event)}
                      />
                    </Grid>
                    <Grid container justifyContent="space-between" className={classes.row}>
                      <label>Password</label>
                      <Link href="#" variant="body2">
                        Forgot Password?
                      </Link>
                    </Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="disabled"/>
                          </InputAdornment>
                        ),
                      }}
                      onChange={ (event: any) => handlePasswordChange(event)}
                    />
                    <Grid container>
                      <Grid container justifyContent='space-between' alignItems='center' className={classes.footer} >
                        <Grid item>
                        {`Don't have an account? `}
                        <Link href="#" variant="body2">
                          Sign up now
                        </Link>
                        </Grid>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={handleSubmit}
                          disabled={!password}
                        >
                          {`Sign In`}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
          </>
      ) : (
        <Home user={currentUser} removeUser={logout}/>
      )}
    </Grid>
  );
}