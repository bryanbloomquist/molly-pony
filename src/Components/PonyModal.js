import React from "react";
import { Modal, Button } from "react-bootstrap";

const PonyModal = ( props ) => {
  return (
    <Modal show = { props.show } onHide = { props.handleClose }>
      <Modal.Header className = "modalHeader">
        <Modal.Title>{ props.modalTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body className = "modalBody">
        <img 
          src = { props.modalImage }
          alt = { props.modalTitle }
          className = "modalImg"
        />
        <p>{ props.modalBody }</p>
      </Modal.Body>
      <Modal.Footer className = "modalFooter">
        <Button 
          onClick = { () => props.handleClose() }
          className = "modalBtn mx-auto"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PonyModal;