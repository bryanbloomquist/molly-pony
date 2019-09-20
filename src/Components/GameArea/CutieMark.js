import React from "react";
import { Col } from "react-bootstrap";

const CutieMark = ( props ) => {
  return (
    <Col 
      xs = { 3 } sm = { 6 }
      className = "hovereffect p-2 m-0"
      onClick = { () => props.clickMark( props.id )}
    >
      <img
        alt = { props.name }
        src = { props.image }
        className = "cutieMark"
      />
    </Col>
  )
}

export default CutieMark;