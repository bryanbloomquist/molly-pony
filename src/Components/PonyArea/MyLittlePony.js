import React from "react";
import "../../App.css";

const MyLittlePony = ( props ) => {
  return (
    <div className = "ponyContainer">
      <img
        alt = { props.name }
        src = { props.image }
        unlocked = { props.unlocked }
        className = { props.unlocked ? "myLittlePony found" : "myLittlePony hidden" }
      />
    </div>
  )
}

export default MyLittlePony;