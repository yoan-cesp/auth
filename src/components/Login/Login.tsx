import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

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
}));

const Login = () => {
  const classes = useStyles();
  // create state variables for each input
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(user, password);
  };

  return (
    <Container component="main" className={classes.main} maxWidth={"xs"}>
      <Card elevation={7} className={classes.root}>
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
            variant="filled"
            type="text"
            required
            value={user}
            className={classes.field}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            id="password"
            label="Contraseña"
            variant="filled"
            type="password"
            required
            className={classes.field}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.cardFooter}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Ingresar
            </Button>
          </div>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
