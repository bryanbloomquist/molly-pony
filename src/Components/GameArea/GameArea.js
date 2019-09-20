import React from "react";

const GameArea = ( props ) => {
  return (
    <div className = "gameArea p-1 m-2">
      { props.children }
    </div>
  );
}

export default GameArea;