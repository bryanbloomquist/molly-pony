import React from "react";
import "../../App.css";

const MyLittlePony = ( props ) => {
  return (
    <div className = "ponyContainer hidden">
      <img
        alt = { props.name }
        src = { props.image }
        unlocked = { props.unlocked }
        className = "myLittlePony"
      />
    </div>
  )
}

export default MyLittlePony;