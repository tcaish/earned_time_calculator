// React
import React, { useState } from 'react';
// React bootstrap
import { Button, Modal } from 'react-bootstrap';
// Amplify
import { Auth } from 'aws-amplify';
// Styles
import '../../styles/CustomModal.css';

/*
@function LogoutModal
@description Sets up the LogoutModal component that is used 
  to log the user out.
@params props The "show" and "onHide" props.
*/
function LogoutModal(props) {
  // Sign out the user
  async function signOut() {
    try {
      await Auth.signOut();
      props.onHide();
    } catch (error) {
      console.log('error signing out: ', error);
    }
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
          Logout
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to logout?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={signOut}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutModal;
