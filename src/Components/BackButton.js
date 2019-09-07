import React from "react";
import "../App.css";

const BackButton = ( props ) => {
  return (
    <div className = "backButtonArea">
      <button
        className = "backButton"
        onClick = { () => props.backButton() }
      >
        Change Difficulty
      </button>
    </div>
  )
}

export default BackButton;