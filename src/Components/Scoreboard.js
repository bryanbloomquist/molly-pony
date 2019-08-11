import React from "react";
import "../App.css";

const Scoreboard = ( props ) => {
  return (
    <div className = "scoreboard">
      <span className = "heading">Target Score:</span>
      <span className = "data">{ props.targetScore }</span>
      <span className = "heading">Player Score:</span>
      <span className = "data">{ props.playerScore }</span>
      <span className = "heading">Player Wins:</span>
      <span className = "data">{ props.playerWins }</span>
      <span className = "heading">Player Losses:</span>
      <span className = "data">{ props.playerLosses }</span>
      <span className = "heading">Total Clicks:</span>
      <span className = "data">{ props.totalClicks }</span>
    </div>
  )
}

export default Scoreboard;