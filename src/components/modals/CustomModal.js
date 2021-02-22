// React
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

// Styles
import '../../styles/Modal.css';

/*
@function CustomModal
@description This creates a custom modal that shows what is supplied in the
  instance creation.
@params props The "show", "onHide", "title", and "body" props.
*/
function CustomModal(props) {
  return (
    <Modal
      {...props}
      className="custom-modal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
