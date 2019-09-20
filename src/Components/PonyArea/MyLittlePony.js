import React from "react";
import { Col } from "react-bootstrap";

const MyLittlePony = ( props ) => {
  return (
    <Col 
      xs = { 6 } sm = { 4 } lg = { 3 } xl = { props.difficulty === 1 ? 3 :2 }
      className = "ponyContainer p-2"
      onClick = { () => props.clickPony( props.id ) }
    >
      <img
        alt = { props.name }
        src = { props.image }
        unlocked = { props.unlocked }
        className = { props.unlocked ? "myLittlePony found" : "myLittlePony hidden" }
      />
    </Col>
  )
}

export default MyLittlePony;