import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import EasyGame from "./Pages/EasyGame";
import NormalGame from "./Pages/NormalGame";
import HardGame from "./Pages/HardGame";
import GameWon from "./Pages/GameWon";
import GameLost from "./Pages/GameLost";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path = "/" component = { Login } />
          <Route exact path = "/easy" component = { EasyGame } />
          <Route exact path = "/normal" component = { NormalGame } />
          <Route exact path = "/hard" component = { HardGame } />
          <Route exact path = "/gamewon" component = { GameWon } />
          <Route exact path = "/gamelost" component = { GameLost } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;