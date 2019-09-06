import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EasyGame from "./Components/EasyGame";
import NormalGame from "./Components/NormalGame";
import HardGame from "./Components/HardGame";
import Login from "./Components/Login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path = "/" component = { Login } />
          <Route exact path = "/easy" component = { EasyGame } />
          <Route exact path = "/normal" component = { NormalGame } />
          <Route exact path = "/hard" component = { HardGame } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;