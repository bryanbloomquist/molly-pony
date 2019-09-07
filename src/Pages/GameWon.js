import React, { Component } from "react";
import { Link } from "react-router-dom";

class GameWon extends Component {
  render() {
    return (
      <div className = "loginArea scoreboard">
        <form>
          <p>Great Job!</p>
          <p>You found all the missing ponies and their friends!</p>
          <p>Why don't you play again at a different difficulty?</p>
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
export default GameWon;