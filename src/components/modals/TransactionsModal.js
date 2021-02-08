// React
import React from 'react';
// React bootstrap
import { Button, Modal } from 'react-bootstrap';
// Styles
import '../../styles/CustomModal.css';

/*
@function TransactionsModal
@description Sets up the TransactionsModal component that is used 
  to update the user's transactions.
@params props The "show" and "onHide" props.
*/
function TransactionsModal(props) {
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
          Add New Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Transaction header</h4>
        <p>Let's add a new transaction</p>
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

export default TransactionsModal;
