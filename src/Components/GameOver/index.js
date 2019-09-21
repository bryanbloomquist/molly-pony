import React from "react";

const GameOver = ( props ) => {
  return(
    <div className = "gameOver p-2 m-2">
      <button
        className = "gameOverBtn p-2 mb-2"
        type = "button"
        onClick = {() => props.startNewGame( 1 )}
      >
        Play Easy Game
      </button>
      <button
        className = "gameOverBtn p-2 mb-2"
        type = "button"
        onClick = {() => props.startNewGame( 2 )}
      >
        Play Normal Game
      </button>
      <button
        className = "gameOverBtn p-2"
        type = "button"
        onClick = {() => props.startNewGame( 3 )}
      >
        Play Hard Game
      </button>
    </div>
  )
}

export default GameOver;