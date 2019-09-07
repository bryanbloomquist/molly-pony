import React, { Component } from "react";
import { Link } from "react-router-dom";

class GameLost extends Component {
  render() {
    return (
      <div className = "loginArea scoreboard">
        <form>
          <p>Nice try!</p>
          <p>You did your best!</p>
          <p>Why don't you play again?</p>
          <p>Select Difficulty:</p>
          <Link to = "/easy">
            <button className = "loginButton">Easy</button>            
          </Link>
          <Link to = "/normal">
            <button className = "loginButton">Normal</button>            
          </Link>
          <Link to = "/hard">
            <button className = "loginButton">Hard</button>            
          </Link>
        </form>
      </div>
    );
  }
}

export default GameLost;