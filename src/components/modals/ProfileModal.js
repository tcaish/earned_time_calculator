// React
import React, { useState, useEffect } from 'react';

// React bootstrap
import { Alert, Form, Row, Col, Button, Modal } from 'react-bootstrap';

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

  // Updates the profile information for the user
  function updateProfile(e) {
    e.preventDefault();

    // If all fields aren't filled in
    if (
      !formData.carry_over_et ||
      !formData.hire_date ||
      !formData.total_et_allowed ||
      !formData.total_yearly_paychecks
    ) {
      setAlertText('Please fill in the required fields!');
      setShowAlert(true);
      return;
    }

    // Remove these properties because they'll cause the mutation to
    // error out
    delete formData.createdAt;
    delete formData.updatedAt;
    delete formData.owner;

    props.updateProfile({ ...formData });
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
              <Col>
                <Form.Group controlId="formCarryOverEt">
                  <Form.Label>*Carry Over ET</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.0"
                    autoComplete="off"
                    value={formData.carry_over_et}
                    onClick={e => e.target.select()}
                    onChange={e =>
                      setFormData({ ...formData, carry_over_et: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    How much earned time you brought over from last year.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formTotalEtAllowed">
                  <Form.Label>*Total ET Allowed</Form.Label>
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
                    How much earned time you can carry over into the new year.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="fromTotalYearlyPaychecks">
                  <Form.Label>*Total Yearly Paychecks</Form.Label>
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
                  />
                  <Form.Text className="text-muted">
                    How many paychecks per year you receive (most common is 26).
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formHireDate">
                  <Form.Label>*Hire Date</Form.Label><br/>
                  <DatePicker 
                    selected={new Date(formData.hire_date)}
                    onChange={date => setFormData({ ...formData, hire_date: date })}
                  />
                  <Form.Text className="text-muted">
                    The date you were hired.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {/* <Row>
              <Col>
                <Form.Group controlId="formHireDateMonth">
                  <Form.Label>*Hire Date Month</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.hire_date_month}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        hire_date_month: e.target.value
                      })
                    }
                  >
                    {[...Array(12).keys()].map(num => (
                      <option key={num}>{num + 1}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHireDateDay">
                  <Form.Label>*Hire Date Day</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.hire_date_day}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        hire_date_day: e.target.value
                      })
                    }
                  >
                    {[...Array(31).keys()].map(num => (
                      <option key={num}>{num + 1}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHireDateYear">
                  <Form.Label>*Hire Date Year</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.hire_date_year}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        hire_date_year: e.target.value
                      })
                    }
                  >
                    {[...Array(new Date().getFullYear() - 1939).keys()].map(
                      num => (
                        <option key={num}>{num + 1940}</option>
                      )
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row> */}

            <Button
              variant="primary"
              type="submit"
              onClick={e => updateProfile(e)}
              block
            >
              Update Profile
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileModal;
