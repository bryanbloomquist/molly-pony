import React from "react";
import "../../App.css";

const PonyArea = ( props ) => {
  return (
    <div className = "ponyArea">
      { props.children }
    </div>
  );
}

export default PonyArea;