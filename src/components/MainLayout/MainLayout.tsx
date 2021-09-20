import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import DrawerApp from "./components/Drawer/DrawerApp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Dashboard = (props: any) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!props.jwtToken) {
      history.push("/login");
    }
  }, [history, props.jwtToken]);

  return (
    <div className={classes.root}>
      <DrawerApp />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div />
        </Container>
      </main>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    jwtToken: state.Auth.jwtToken,
    status: state.Auth.status,
  };
}

export default connect(mapStateToProps)(Dashboard);
