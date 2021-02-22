// React
import React, { useState } from 'react';

// React bootstrap
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
  ToggleButton
} from 'react-bootstrap';

// Third-party
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Exports
import {
  initialTransactionState,
  isValidDateFromStr,
  getTransactionFormatDate
} from '../../exports/Functions';

// Styles
import '../../styles/Modal.css';

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
  const [typeRadioValue, setTypeRadioValue] = useState('Vacation');
  const [debitRadioValue, setDebitRadioValue] = useState('true');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const types = [
    { name: 'Vacation', value: 'Vacation' },
    { name: 'Holiday', value: 'Holiday' }
  ];

  const debits = [
    { name: 'Withdrawl', value: 'true' },
    { name: 'Deposit', value: 'false' }
  ];

  // Resets values in this modal
  function resetData() {
    setIsLoading(false);
    setFormData(initialTransactionState);
  }

  // When the modal shows, update the values to be that of the transaction
  // passed in or to the initial transaction state
  function onShowModal() {
    setShowAlert(false);

    setFormData(
      props.transactionToModify !== null
        ? props.transactionToModify
        : initialTransactionState
    );
    setTypeRadioValue(
      props.transactionToModify !== null
        ? props.transactionToModify.type
        : types[0].value
    );
    setDebitRadioValue(
      props.transactionToModify !== null
        ? props.transactionToModify.debit.toString()
        : debits[0].value
    );
  }

  // Adds or updates a transaction to or in the database
  function addUpdateTransaction(e) {
    e.preventDefault();

    // If all fields aren't filled in
    if (
      formData.date === undefined ||
      formData.debit === undefined ||
      formData.time_used === undefined ||
      formData.type === undefined
    ) {
      setAlertText('Please fill in the required fields!');
      setShowAlert(true);
      return;
    } else if (formData.time_used <= 0) {
      setAlertText('Please enter an Hours value that is greater than 0.');
      setShowAlert(true);
      return;
    }

    // Check if hire date is a valid date
    if (!isValidDateFromStr(formData.date)) {
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

    // Update debit value to be boolean
    if (formData.debit === 'true' || formData.debit === 'false') {
      formData.debit = formData.debit === 'true' ? true : false;
    }

    // Update time_used value to be a number
    formData.time_used = parseFloat(formData.time_used);

    // If user is modifying a transaction
    if (props.transactionToModify !== null) {
      props
        .modifyTransaction({
          ...formData,
          id: props.transactionToModify.id
        })
        .then(res => resetData())
        .catch(err => console.log(err));
    } else {
      // If there is still an id value when adding a new transaction, remove it
      if (formData.id !== undefined) delete formData.id;
      props
        .addTransaction(formData)
        .then(res => resetData())
        .catch(err => console.log(err));
    }
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
            {props.transactionToModify !== null
              ? 'Edit Transaction from ' +
                getTransactionFormatDate(props.transactionToModify.date)
              : 'Add New Transaction'}
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
            <Container>
              <Row xs={1} lg={2}>
                <Col>
                  <Form.Group controlId="formTransactionType">
                    <Form.Label>Type</Form.Label>
                    <br />
                    <ButtonGroup toggle>
                      {types.map((type, idx) => (
                        <ToggleButton
                          className="transaction-type-toggle"
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
                  <Form.Group controlId="formTransactionDebit">
                    <Form.Label>Transaction</Form.Label>
                    <br />
                    <ButtonGroup toggle>
                      {debits.map((type, idx) => (
                        <ToggleButton
                          className="transaction-debit-toggle"
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
                      What you're doing with your vacation or holiday hours.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row xs={1} lg={2}>
                <Col>
                  <Form.Group controlId="formTransactionDate">
                    <Form.Label>Date</Form.Label>
                    <br />
                    <DatePicker
                      showMonthDropdown={true}
                      showYearDropdown={true}
                      dropdownMode="select"
                      popperPlacement="top-start"
                      selected={new Date(formData.date)}
                      onChange={theDate =>
                        setFormData({ ...formData, date: theDate })
                      }
                    />
                    <Form.Text className="text-muted">
                      The date of the transaction.
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formHours">
                    <Form.Label>Amount of Hours</Form.Label>

                    <InputGroup>
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
                      <InputGroup.Append>
                        <InputGroup.Text id="basic-addon1">
                          hours
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      The amount of vacation you used or are adding.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                className="custom-btn-blue"
                variant="primary"
                type="submit"
                onClick={e => addUpdateTransaction(e)}
                disabled={isLoading}
                block
              >
                {!isLoading ? (
                  props.transactionToModify !== null ? (
                    'Update Transaction'
                  ) : (
                    'Add Transaction'
                  )
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
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransactionsModal;
