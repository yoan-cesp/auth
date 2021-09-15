import { Box, Button, Container, CssBaseline } from "@material-ui/core";
import React, { FC } from "react";
import CustomTheme, { useCreateCustomTheme } from "./CustomTheme";

const App: FC = function App() {
  const themeData = useCreateCustomTheme();
  return (
    <CustomTheme theme={themeData}>
      <CssBaseline />
      <Container>
        <Box className="App">
          <header className="App-header">
            <p>
              Bootstraped with Create-React-App, This repo uses material ui and
              comes with react, typescript, prettier, eslint and a custom theme
              switcher to get you going.
            </p>
            <Button
              color="primary"
              variant="contained"
              onClick={themeData.toggleTheme}
            >
              Toggle theme
            </Button>
          </header>
        </Box>
      </Container>
    </CustomTheme>
  );
};

export default App;
