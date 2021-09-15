import { Box, Button, Container, CssBaseline } from "@material-ui/core";
import React, { FC } from "react";
import CustomTheme, { useCreateCustomTheme } from "./CustomTheme";
import Login from "./components/Login/Login";

const App: FC = function App() {
  const themeData = useCreateCustomTheme();
  return (
    <CustomTheme theme={themeData}>
      <CssBaseline />
      <Container>
        <Box className="App">
          <Login />
        </Box>
      </Container>
    </CustomTheme>
  );
};

export default App;
