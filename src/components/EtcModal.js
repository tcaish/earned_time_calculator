// React
import React from 'react';

// React bootstrap
import { Button, Modal } from 'react-bootstrap';

// Exports
import { modalType } from '../exports/Functions';

// Styles
import '../styles/EtcModal.css';

/*
@function EtcModal
@description Sets up the EtcModal component that is used 
  for navigation buttons and adding a new transaction.
@params props The "type", "show", and "onHide" props.
*/
function EtcModal(props) {
  // Sets the modal title depending on the type
  function CustomModalTitle() {
    let title;

    switch (props.type) {
      case modalType.profile:
        title = 'Profile';
        break;
      case modalType.settings:
        title = 'Settings';
        break;
      case modalType.logout:
        title = 'Logout';
        break;
      case modalType.transaction:
        title = 'Add New Transaction';
        break;
      default:
        title = 'Error';
        break;
    }

    return title;
  }

  // Sets the modal body depending on the type
  function CustomModalBody() {
    let body;

    switch (props.type) {
      case modalType.profile:
        body = (
          <>
            <h4>This is the profile body.</h4>
            <p>Hello from profile!</p>
          </>
        );
        break;
      case modalType.settings:
        body = (
          <>
            <h4>This is the settings body.</h4>
            <p>Hello from settings!</p>
          </>
        );
        break;
      case modalType.logout:
        body = (
          <>
            <p>Are you sure you want to logout?</p>
          </>
        );
        break;
      case modalType.transaction:
        body = (
          <>
            <p>This is adding a new transaction.</p>
          </>
        );
        break;
      default:
        body = (
          <>
            <h4>Error producing modal</h4>
            <p>Something went wrong producing the modal.</p>
          </>
        );
        break;
    }

    return body;
  }

  // Sets the modal footer depending on the type
  function CustomModalFooter() {
    let footer;

    switch (props.type) {
      case modalType.profile:
        footer = (
          <>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="success" onClick={props.onHide}>
              Update
            </Button>
          </>
        );
        break;
      case modalType.settings:
        footer = (
          <>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="success" onClick={props.onHide}>
              Update
            </Button>
          </>
        );
        break;
      case modalType.logout:
        footer = (
          <>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="danger" onClick={props.onHide}>
              Logout
            </Button>
          </>
        );
        break;
      case modalType.transaction:
        footer = (
          <>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="success" onClick={props.onHide}>
              Update
            </Button>
          </>
        );
        break;
      default:
        footer = (
          <>
            <h4>Error producing modal</h4>
            <p>Something went wrong producing the modal.</p>
          </>
        );
        break;
    }

    return footer;
  }

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
          <CustomModalTitle />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomModalBody />
      </Modal.Body>
      <Modal.Footer>
        <CustomModalFooter />
      </Modal.Footer>
    </Modal>
  );
}

export default EtcModal;
