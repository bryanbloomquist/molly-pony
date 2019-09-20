import React from "react";
import { Modal, Button } from "react-bootstrap";

const PonyModal = ( props ) => {
  return (
    <Modal show = { props.show } onHide = { props.handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{ props.modalTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img 
          src = { props.modalImage }
          alt = { props.modalTitle }
        />
        <p>{ props.modalBody }</p>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant = "warning" 
          onClick = { () => props.handleClose() }
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PonyModal;