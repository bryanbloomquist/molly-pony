import React from "react";
import "../../App.css";

const GameArea = ( props ) => {
  return (
    <div className = "gameArea">
      { props.children }
    </div>
  );
}

export default GameArea;