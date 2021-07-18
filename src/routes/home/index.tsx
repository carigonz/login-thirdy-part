import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import User from "../../types/user";
import { Button, CardActions } from "@material-ui/core";
import { removeSession } from "../../api/session-storage";



const useStyles = makeStyles({
  card: {
    maxWidth: 560,
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem'
  },
  media: {
    borderRadius: '50%',
    maxWidth: '200px',
    margin: '1rem auto'
  },
});

interface PropTypes {
  user: User | boolean;
  removeUser: () => void;
}

const Home = ({ user, removeUser }: PropTypes) => {
  const classes = useStyles();

  const onRemoveUser = () => {
    removeSession();
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    window.history.replaceState(window.history.state, 'Login', '/login');
    removeUser();
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          User Profile: successfully authenticated!
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={onRemoveUser}
            >
            {`Log out for testing purposes`}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Home;