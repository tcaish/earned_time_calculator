// React
import React from 'react';
// React bootstrap
import { Button, Modal } from 'react-bootstrap';
// Styles
import '../../styles/CustomModal.css';

/*
@function SettingsModal
@description Sets up the SettingsModal component that is used 
  to update the user's settings.
@params props The "show" and "onHide" props.
*/
function SettingsModal(props) {
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
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>This is a settings header</h4>
        <p>These are the settings!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="success" onClick={props.onHide}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
