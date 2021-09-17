import React, { FC } from "react";
import CustomTheme, { useCreateCustomTheme } from "./CustomTheme";
import MainLayout from "./components/MainLayout/MainLayout";

import "./App.css";

const App: FC = function App() {
  const themeData = useCreateCustomTheme();
  return (
    <CustomTheme theme={themeData}>
      <MainLayout />
    </CustomTheme>
  );
};

export default App;
