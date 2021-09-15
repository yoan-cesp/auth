import React, { useState } from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
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
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Usuario"
        variant="filled"
        required
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <TextField
        label="Contraseña"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Ingresar
        </Button>
      </div>
    </form>
  );
};

export default Login;
