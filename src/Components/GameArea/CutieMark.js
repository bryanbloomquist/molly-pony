import React from "react";
import "../../App.css";

const CutieMark = ( props ) => {
  return (
    <div
      className = "imgContainer hovereffect"
      onClick = { () => props.clickMark( props.id )}
    >
      <img
        alt = { props.name }
        src = { props.image }
        className = "cutieMark"
      />
    </div>
  )
}

export default CutieMark;