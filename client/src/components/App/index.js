import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WebFont from "webfontloader";
import Overview from "../Overview";
import Create from "../Create";
import Edit from "../Edit";

import View from "../View";

import { AppWrapper, GlobalStyle } from "../styled";

WebFont.load({
  google: {
    families: ["Open Sans:400,600,700", "sans-serif"],
  },
});

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <AppWrapper>
        <Switch>
          <Route path="/edit/:id" exact component={Edit} />
          <Route path="/create" component={Create} />
          <Route path="/view" component={View} />
          <Route path="/" component={Overview} />
        </Switch>
      </AppWrapper>
      <GlobalStyle />
    </Router>
  );
};

export default App;
