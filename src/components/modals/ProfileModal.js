// React
import React, { useState } from 'react';

// React bootstrap
import {
  Alert,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner
} from 'react-bootstrap';

// Third-party
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Exports
import {
  initialProfileState,
  isValidDateFromStr
} from '../../exports/Functions';

// Styles
import '../../styles/Modal.css';

/*
@function ProfileModal
@description Sets up the ProfileModal component that is used 
  to update the user's profile information.
@params props The "type", "show", "onHide", and "updateprofile" props.
*/
function ProfileModal(props) {
  // Form state
  const [formData, setFormData] = useState(initialProfileState);

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Resets values in this modal
  function resetData() {
    setIsLoading(false);
    setFormData(initialProfileState);
  }

  // When the modal shows, update the values to be that of the profile, if
  // available, or initial profile state
  function onShowModal() {
    setShowAlert(false);

    props.profile.updatedAt !== undefined
      ? setFormData(props.profile)
      : setFormData(initialProfileState);
  }

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
      formData.carry_over_et === undefined ||
      formData.hire_date === undefined ||
      formData.total_et_allowed === undefined
      // !formData.total_yearly_paychecks
    ) {
      setAlertText('Please fill in the required fields!');
      setShowAlert(true);
      return;
    }

    // Check if hire date is a valid date
    if (!isValidDateFromStr(formData.hire_date)) {
      setAlertText('Please enter a valid date!');
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    // Remove these properties because they'll cause the mutation to
    // error out
    delete formData.createdAt;
    delete formData.updatedAt;
    delete formData.owner;

    props
      .updateProfile(formData)
      .then(res => resetData())
      .catch(err => console.log(err));
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        onShow={onShowModal}
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
              <Col className="align-center">
                <p>
                  <b>Email:</b> {props.user.attributes.email}
                </p>
              </Col>
            </Row>
            <Row xs={1} lg={2}>
              <Col>
                <Form.Group controlId="formHireDate">
                  <Form.Label>Hire Date</Form.Label>
                  <br />
                  <DatePicker
                    showMonthDropdown={true}
                    showYearDropdown={true}
                    dropdownMode="select"
                    popperPlacement="top-start"
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

                  <InputGroup>
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
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon1">hours</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>

                  <Form.Text className="text-muted">
                    How much vacation you brought over from last year.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row xs={1} lg={2}>
              <Col>
                <Form.Group controlId="formTotalEtAllowed">
                  <Form.Label>Yearly Carry-Over Limit</Form.Label>

                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="0.0"
                      autoComplete="off"
                      value={formData.total_et_allowed}
                      disabled={formData.total_et_allowed === 0}
                      onClick={e => e.target.select()}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          total_et_allowed: e.target.value
                        })
                      }
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>hours</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    How much vacation you can carry over into the new year.
                  </Form.Text>
                </Form.Group>
                <Form.Group id="formCarryOverCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Infinite/No Carry-Over Limit"
                    checked={formData.total_et_allowed === 0 ? true : false}
                    onChange={e => {
                      const yearlyEtInput = document.getElementById(
                        'formTotalEtAllowed'
                      );

                      // If the checkbox is checked
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          total_et_allowed: 0
                        });

                        yearlyEtInput.value = 0;
                        yearlyEtInput.disabled = true;
                      } else {
                        setFormData({ ...formData, total_et_allowed: 120 });
                        yearlyEtInput.disabled = false;
                      }
                    }}
                  />
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
