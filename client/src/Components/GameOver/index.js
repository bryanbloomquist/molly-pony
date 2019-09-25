import React from "react";

const GameOver = ( props ) => {
  return(
    <div className = { !props.gameStatus ? "gameOver p-2 m-2" : "gameOver p-2 mx-auto"}>
      { 
        !props.gameStatus
      ? 
        <button
          className = "gameOverBtn p-2 mb-2"
          type = "button"
          onClick = {() => props.showHighScores()}
        >
          View Highscores
        </button>
      : 
        <span></span>
      }
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