import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    difficulty: 0
  }

  selectEasy = () => {
    this.setState({ difficulty: "easy" });
  }

  render() {
    return (
      <div className = "loginArea scoreboard">
        <form>
          <p>Welcome to Ponyville.</p>
          <p>Can you rescue the missing My Little Ponies and all their friends?</p>
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

export default Login;