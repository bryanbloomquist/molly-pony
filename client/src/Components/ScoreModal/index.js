import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const ScoreModal = ( props ) => {
  return (
    <Modal show = { props.showModal2 } onHide = { props.handleClose2 }>
      <Modal.Header className = "modalHeader">
        <Modal.Title>{ props.modalTitle2 }</Modal.Title>
      </Modal.Header>
      <Modal.Body className = "modalBody">
        <img 
          src = "/images/ManeSix.png"
          alt = "The Mane Six"
          className = "modalImg"
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ props.name }</td>
              <td>{ props.score }</td>
              <td>{ props.clicks }</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className = "modalFooter">
        <Button 
          onClick = { () => props.handleClose2() }
          className = "modalBtn mx-auto"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScoreModal;