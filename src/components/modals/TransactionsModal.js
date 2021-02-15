// React
import React, { useState } from 'react';

// React bootstrap
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
  ToggleButton
} from 'react-bootstrap';

// Third-party
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Styles
import '../../styles/CustomModal.css';

const initialTransactionState = {
  date: new Date(),
  type: 'Earned Time',
  debit: 'true',
  time_used: 0.0
};

/*
@function TransactionsModal
@description Sets up the TransactionsModal component that is used 
  to update the user's transactions.
@params props The "show" and "onHide" props.
*/
function TransactionsModal(props) {
  // Form state
  const [formData, setFormData] = useState(initialTransactionState);

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  // Radio button states
  const [typeRadioValue, setTypeRadioValue] = useState('Earned Time');
  const [debitRadioValue, setDebitRadioValue] = useState('true');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const types = [
    { name: 'Earned Time', value: 'Earned Time' },
    { name: 'Holiday', value: 'Holiday' }
  ];

  const debits = [
    { name: 'Withdrawl', value: 'true' },
    { name: 'Deposit', value: 'false' }
  ];

  // Adds a transaction to the database for a user
  function addTransaction(e) {
    e.preventDefault();

    // If all fields aren't filled in
    if (
      formData.date == undefined ||
      formData.debit == undefined ||
      formData.time_used == undefined ||
      formData.type == undefined
    ) {
      setAlertText('Please fill in the required fields!');
      setShowAlert(true);
      return;
    } else if (formData.time_used <= 0) {
      setAlertText('Please enter an Hours value that is greater than 0.');
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    // Remove these properties because they'll cause the mutation to
    // error out
    delete formData.createdAt;
    delete formData.updatedAt;
    delete formData.owner;

    // Update debit value to be boolean
    if (formData.debit === 'true' || formData.debit === 'false') {
      formData.debit = formData.debit === 'true' ? true : false;
    }

    // Update time_used value to be a number
    formData.time_used = parseFloat(formData.time_used);

    props.addTransaction(formData);

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
            Add New Transaction
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
                <Form.Group controlId="formTransactionType">
                  <Form.Label>Type</Form.Label>
                  <br />
                  <ButtonGroup toggle>
                    {types.map((type, idx) => (
                      <ToggleButton
                        key={idx}
                        type="radio"
                        variant="primary"
                        name="radio"
                        value={type.value}
                        checked={typeRadioValue === type.value}
                        onChange={e => {
                          setTypeRadioValue(e.currentTarget.value);
                          setFormData({
                            ...formData,
                            type: e.currentTarget.value
                          });
                        }}
                      >
                        {type.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                  <Form.Text className="text-muted">
                    The type of transaction to add.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formTransactionDate">
                  <Form.Label>Date</Form.Label>
                  <br />
                  <DatePicker
                    selected={formData.date}
                    onChange={theDate =>
                      setFormData({ ...formData, date: theDate })
                    }
                  />
                  <Form.Text className="text-muted">
                    The date of the transaction.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formTransactionDebit">
                  <Form.Label>Transaction</Form.Label>
                  <br />
                  <ButtonGroup toggle>
                    {debits.map((type, idx) => (
                      <ToggleButton
                        key={idx}
                        type="radio"
                        variant="info"
                        name="radio"
                        value={type.value}
                        checked={debitRadioValue === type.value}
                        onChange={e => {
                          setDebitRadioValue(e.currentTarget.value);
                          setFormData({
                            ...formData,
                            debit: e.currentTarget.value
                          });
                        }}
                      >
                        {type.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                  <Form.Text className="text-muted">
                    What you're doing with your earned time or holiday hours.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formHours">
                  <Form.Label>Hours</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.0"
                    autoComplete="off"
                    value={formData.time_used}
                    onClick={e => e.target.select()}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        time_used: e.target.value
                      })
                    }
                  />
                  <Form.Text className="text-muted">
                    The amount of hours you used or are adding.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Button
              className="custom-btn-blue"
              variant="primary"
              type="submit"
              onClick={e => addTransaction(e)}
              disabled={isLoading}
              block
            >
              {!isLoading ? (
                'Add Transaction'
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

export default TransactionsModal;
