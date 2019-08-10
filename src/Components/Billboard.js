import React from "react";
import "../App.css";

const Billboard = ( props ) => {
  return (
    <div className = "scoreboard">
      <span className = "billboardText">{ props.display }</span>
    </div>
  )
}

export default Billboard;