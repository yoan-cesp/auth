import React, { FC } from "react";
import CustomTheme, { useCreateCustomTheme } from "./CustomTheme";
import Login from "./components/Login/Login";
import "./App.css";

const App: FC = function App() {
  const themeData = useCreateCustomTheme();
  return (
    <CustomTheme theme={themeData}>
      <Login />
    </CustomTheme>
  );
};

export default App;
