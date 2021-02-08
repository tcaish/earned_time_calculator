// React
import React, { useState, useEffect } from 'react';

// React bootstrap
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

// Styles
import '../../styles/CustomModal.css';

/*
@function ProfileModal
@description Sets up the ProfileModal component that is used 
  to update the user's profile information.
@params props The "type", "show", "onHide", and "updateprofile" props.
*/
function ProfileModal(props) {
  const [formData, setFormData] = useState({ ...props.profile });

  // Updates the profile information for the user
  function updateProfile(e) {
    e.preventDefault();

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
          <Form>
            <Form.Group controlId="formCarryOverEt">
              <Form.Label>Carry Over ET</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.0"
                autoComplete="off"
                value={formData.carry_over_et}
                onChange={e =>
                  setFormData({ ...formData, carry_over_et: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formUsedEt">
              <Form.Label>Used ET</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.0"
                autoComplete="off"
                value={formData.used_et}
                onChange={e =>
                  setFormData({ ...formData, used_et: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formCurrentHol">
              <Form.Label>Current Unused Holiday</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.0"
                autoComplete="off"
                value={formData.current_hol}
                onChange={e =>
                  setFormData({ ...formData, current_hol: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formHireDateMonth">
                  <Form.Label>Hire Date Month</Form.Label>
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
                  <Form.Label>Hire Date Day</Form.Label>
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
                  <Form.Label>Hire Date Year</Form.Label>
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
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formTotalEtAllowed">
                  <Form.Label>Total ET Allowed</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.0"
                    autoComplete="off"
                    value={formData.total_et_allowed}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        total_et_allowed: e.target.value
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="fromTotalYearlyPaychecks">
                  <Form.Label>Total Yearly Paychecks</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    autoComplete="off"
                    value={formData.total_yearly_paychecks}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        total_yearly_paychecks: e.target.value
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

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
