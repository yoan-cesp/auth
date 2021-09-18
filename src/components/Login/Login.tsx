import {
  Box,
  Button,
  Card,
  Container,
  InputAdornment,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { STATUS } from "../../constans/common";
import {
  getCode,
  getToken,
  processLogin,
} from "../../redux/actions/authAction";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      background: theme.palette.background.default,
    },

    "& .MuiFilledInput-input": {
      background: theme.palette.background.default,
    },

    "& .MuiFilledInput-root": {
      background: theme.palette.background.default,
    },

    "& .MuiInputBase-input": {
      background: theme.palette.background.default,
    },

    "& .MuiButtonBase-root": {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  field: {
    background: theme.palette.background.default,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    margin: "-16px -15px 15px",
  },
  icon: {
    color: "#7c7c7c",
  },
}));

const Login = (props: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [shouldDisableButton, setShouldDisableButton] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!props.jwtToken) {
      processLogin(dispatch);
    }
  }, [dispatch, props.jwtToken]);

  useEffect(() => {
    if (props.jwtToken) {
      history.push("/");
    }
  }, [history, props.jwtToken]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      user,
      password,
      code_challenge: props.codeChallenge,
    };

    getCode(dispatch, userData);
  };

  const onInputChange = (e: any, type: any) => {
    type === "user" ? setUser(e.target.value) : setPassword(e.target.value);
  };

  useEffect(() => {
    setShouldDisableButton(
      Boolean(user === "" || password === "" || props.status === STATUS.Loading)
    );
  }, [shouldDisableButton, user, password, props.status]);

  useEffect(() => {
    if (props.code && props.codeVerifier) {
      getToken(dispatch, props.codeVerifier, props.code);
    }
  }, [dispatch, props.codeVerifier, props.code]);

  return (
    <Container component="main" className={classes.main} maxWidth={"xs"}>
      <Card elevation={7} className={classes.root}>
        {props.status === STATUS.Loading && (
          <LinearProgress className={classes.progress} />
        )}
        <Typography component="h1" variant="h5" align="center">
          Autenticación
        </Typography>
        <Box className={classes.root} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="user"
            name="user"
            autoFocus
            label="Usuario"
            variant="standard"
            type="text"
            required
            value={user}
            className={classes.field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle className={classes.icon} fontSize={"small"} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => onInputChange(e, "user")}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            id="password"
            label="Contraseña"
            variant="standard"
            type="password"
            required
            className={classes.field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={classes.icon} fontSize={"small"} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => onInputChange(e, "password")}
          />
          <div className={classes.cardFooter}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              disabled={shouldDisableButton}
            >
              Ingresar
            </Button>
          </div>
        </Box>
      </Card>
    </Container>
  );
};

function mapStateToProps(state: any) {
  return {
    jwtToken: state.Auth.jwtToken,
    oauthLoginUrl: state.Auth.oauthLoginUrl,
    code: state.Auth.code,
    codeChallenge: state.Auth.codeChallenge,
    status: state.Auth.status,
    codeVerifier: state.Auth.codeVerifier,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    processLogin: bindActionCreators(processLogin, dispatch),
    getCode: bindActionCreators(getCode, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
