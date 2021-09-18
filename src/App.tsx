import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store/store";
import CustomTheme, { useCreateCustomTheme } from "./CustomTheme";
import MainLayout from "./components/MainLayout/MainLayout";
import Login from "./components/Login/Login";

import "./App.css";

const App: FC = function App() {
  const themeData = useCreateCustomTheme();

  return (
    <Provider store={configureStore()}>
      <CustomTheme theme={themeData}>
        <Router>
          <Switch>
            <Route exact path="/" component={MainLayout} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </CustomTheme>
    </Provider>
  );
};

export default App;
