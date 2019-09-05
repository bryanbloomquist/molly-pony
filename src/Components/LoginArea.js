import React from "react";

const LoginArea = ( props ) => {
  return (
    <div className = "loginArea scoreboard">
      <form>
        <p>Enter Name:</p>
        <input 
          type = "text"
          onChange = { () => props.myChangeHandler() }
        />
        <p>Select Difficulty:</p>
        <button 
          onClick = { () => props.selectEasy() }
          className = "loginButton"
        >
          Easy
        </button>
        <button 
          onClick = { () => props.selectNormal() }
          className = "loginButton"
        >
          Normal
        </button>
        <button 
          onClick = { () => props.selectHard() }
          className = "loginButton"
        >
          Hard
        </button>
      </form>
    </div>
  );
}

export default LoginArea;