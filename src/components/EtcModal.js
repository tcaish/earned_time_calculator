// React
import React, { useState } from 'react';
// React bootstrap
import { Form } from 'react-bootstrap';
// Amplify
import { Auth } from 'aws-amplify';
// React bootstrap
import { Button, Modal } from 'react-bootstrap';
// Exports
import { modalType, initialProfileState } from '../exports/Functions';
// Styles
import '../styles/EtcModal.css';

/*
@function EtcModal
@description Sets up the EtcModal component that is used 
  for navigation buttons and adding a new transaction.
@params props The "type", "show", and "onHide" props.
*/
function EtcModal(props) {
  const [formData, setFormData] = useState(initialProfileState);

  function updateProfile(e) {
    e.preventDefault();

    console.log(formData);
  }

  // Sign out the user
  async function signOut() {
    try {
      await Auth.signOut();
      props.onHide();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

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
          <Form>
            <Form.Group controlId="formCarryOverEt">
              <Form.Label>Carry Over ET</Form.Label>
              <Form.Control placeholder="0.0" value={formData.carry_over_et} onChange={(e) => setFormData({...formData, 'carry_over_et': e.target.value})} />
            </Form.Group>

            <Form.Group controlId="formUsedEt">
              <Form.Label>Used ET</Form.Label>
              <Form.Control placeholder="0.0" value={formData.used_et} onChange={(e) => setFormData({...formData, 'used_et': e.target.value})} />
            </Form.Group>

            <Form.Group controlId="formCurrentHol">
              <Form.Label>Current Holiday</Form.Label>
              <Form.Control placeholder="0.0" value={formData.current_hol} onChange={(e) => setFormData({...formData, 'current_hol': e.target.value})} />
            </Form.Group>

            <Form.Group controlId="formHireDateMonth">
              <Form.Label>Hire Date Month</Form.Label>
              <Form.Control as="select" value={formData.hire_date_month} onChange={(e) => setFormData({...formData, 'hire_date_month': e.target.value})} >
                {
                  [...Array(12).keys()].map((num) => (
                    <option key={num}>{num + 1}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formHireDateDay">
              <Form.Label>Hire Date Day</Form.Label>
              <Form.Control as="select" value={formData.hire_date_day} onChange={(e) => setFormData({...formData, 'hire_date_day': e.target.value})} >
                {
                  [...Array(31).keys()].map((num) => (
                    <option key={num}>{num + 1}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formHireDateYear">
              <Form.Label>Hire Date Year</Form.Label>
              <Form.Control as="select" value={formData.hire_date_year} onChange={(e) => setFormData({...formData, 'hire_date_year': e.target.value})} >
                {
                  [...Array((new Date().getFullYear() - 1939)).keys()].map((num) => (
                    <option key={num}>{num + 1940}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTotalEtAllowed">
              <Form.Label>Total ET Allowed</Form.Label>
              <Form.Control placeholder="0.0" value={formData.total_et_allowed} onChange={(e) => setFormData({...formData, 'total_et_allowed': e.target.value})} />
            </Form.Group>

            <Form.Group controlId="fromTotalYearlyPaychecks">
              <Form.Label>Total Yearly Paychecks</Form.Label>
              <Form.Control placeholder="0" value={formData.total_yearly_paychecks} onChange={(e) => setFormData({...formData, 'total_yearly_paychecks': e.target.value})} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => updateProfile(e) } block>
              Update Profile
            </Button>
          </Form>
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
            <Button variant="danger" onClick={signOut}>
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
