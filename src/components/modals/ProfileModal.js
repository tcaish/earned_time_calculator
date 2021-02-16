// React
import React, { useState } from 'react';

// React bootstrap
import { Alert, Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';

// Third-party
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Styles
import '../../styles/CustomModal.css';

/*
@function ProfileModal
@description Sets up the ProfileModal component that is used 
  to update the user's profile information.
@params props The "type", "show", "onHide", and "updateprofile" props.
*/
function ProfileModal(props) {
  // Form state
  const [formData, setFormData] = useState({ ...props.profile });

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Updates the profile information for the user
  function updateProfile(e) {
    e.preventDefault();

    formData.total_yearly_paychecks = 26;
    formData.hire_date =
      formData.hire_date !== undefined
        ? new Date(formData.hire_date).toString()
        : new Date().toString();

    // If all fields aren't filled in
    if (
      !formData.carry_over_et ||
      !formData.hire_date ||
      !formData.total_et_allowed
      // !formData.total_yearly_paychecks
    ) {
      setAlertText('Please fill in the required fields!');
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    // Remove these properties because they'll cause the mutation to
    // error out
    delete formData.createdAt;
    delete formData.updatedAt;
    delete formData.owner;

    props.updateProfile({ ...formData });

    setIsLoading(false);
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="custom-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Profile Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert
              className="align-center"
              variant="warning"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertText}
            </Alert>
          )}

          <Form>
            <Row>
              <Col></Col>
              <Col>
                <p>
                  <b>Email:</b> {props.user.attributes.email}
                </p>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formHireDate">
                  <Form.Label>Hire Date</Form.Label>
                  <br />
                  <DatePicker
                    selected={
                      formData.hire_date !== undefined
                        ? new Date(formData.hire_date)
                        : new Date()
                    }
                    onChange={date =>
                      setFormData({ ...formData, hire_date: date })
                    }
                  />
                  <Form.Text className="text-muted">
                    The date you were hired.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formCarryOverEt">
                  <Form.Label>Beginning Vacation</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.0"
                    autoComplete="off"
                    value={formData.carry_over_et}
                    onClick={e => e.target.select()}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        carry_over_et: e.target.value
                      })
                    }
                  />
                  <Form.Text className="text-muted">
                    How much vacation you brought over from last year.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formTotalEtAllowed">
                  <Form.Label>Yearly Carry-Over</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.0"
                    autoComplete="off"
                    value={formData.total_et_allowed}
                    onClick={e => e.target.select()}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        total_et_allowed: e.target.value
                      })
                    }
                  />
                  <Form.Text className="text-muted">
                    How much vacation you can carry over into the new year.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="fromTotalYearlyPaychecks">
                  <Form.Label>Total Yearly Paychecks</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="26"
                    autoComplete="off"
                    value={formData.total_yearly_paychecks}
                    onClick={e => e.target.select()}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        total_yearly_paychecks: e.target.value
                      })
                    }
                    disabled
                  />
                  <Form.Text className="text-muted">
                    How many paychecks per year you receive (most common is 26).
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Button
              className="custom-btn-blue"
              type="submit"
              onClick={e => updateProfile(e)}
              disabled={isLoading}
              block
            >
              {!isLoading ? (
                'Update Profile'
              ) : (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                </>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal;
