// React
import React, { useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Popover,
  Row,
  Table
} from 'react-bootstrap';

// Exports
import { getTransactionFormatDate, modalType } from '../exports/Functions';

// Styles
import '../styles/Transaction.css';

function Transactions({
  transactions,
  summary,
  setModalShow,
  setModalType,
  deleteTransaction,
  modifyTransaction
}) {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const years = transactions
    .map(t => new Date(t.date).getFullYear().toString())
    .sort((a, b) => parseInt(b) - parseInt(a));

  // Popover confirmation for deleting a transaction
  const deleteConfirmationPopover = transaction => (
    <Popover id="popover-basic">
      <Popover.Title className="text-black" as="h3">
        Are you sure?
      </Popover.Title>
      <Popover.Content className="align-center">
        <Button
          className="custom-btn-red"
          size="sm"
          variant="danger"
          onClick={() => deleteTransaction(transaction)}
        >
          Delete
        </Button>
      </Popover.Content>
    </Popover>
  );

  // Shows the modal depending on the navigation button clicked
  function showModal(modalType) {
    setModalType(modalType);
    setModalShow(true);
  }

  function setTransactionComp() {
    if (summary.et_rate > 0) {
      return (
        <>
          <h3 className="align-center">Transactions</h3>
          <Row>
            <Col xs={12} md={10}>
              <Button
                className="transaction-btn custom-btn-green-outline"
                size="sm"
                variant="outline-primary"
                block
                onClick={() => showModal(modalType.transactions)}
              >
                Add Transaction
              </Button>
            </Col>
            <Col xs={12} md={2}>
              <DropdownButton
                id="year-dropdown"
                className="align-right"
                title={year}
                size="sm"
              >
                {years.map((theYear, i) => (
                  <Dropdown.Item key={i} onClick={() => setYear(theYear)}>
                    {theYear}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>

          {transactions.length >= 1 && (
            <Table bordered striped hover variant="dark" size="sm">
              <thead>
                <tr>
                  <th className="align-center">Date</th>
                  <th className="align-center">Type</th>
                  <th className="align-center">Amount (hrs)</th>
                  <th className="align-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions
                  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort in descending order
                  .map(transaction => (
                    <tr key={transaction.id}>
                      <td className="align-center">
                        {getTransactionFormatDate(transaction.date)}
                      </td>
                      <td className="align-center">{transaction.type}</td>
                      <td className="align-center">
                        {transaction.debit ? '-' : '+'}
                        {transaction.time_used}
                      </td>
                      <td className="align-center">
                        <Badge
                          className="trans-badge trans-badge-modify"
                          variant="success"
                          onClick={() => modifyTransaction(transaction)}
                        >
                          Modify
                        </Badge>{' '}
                        <OverlayTrigger
                          trigger="click"
                          placement="auto"
                          rootClose={true}
                          overlay={deleteConfirmationPopover(transaction)}
                        >
                          <Badge
                            className="trans-badge trans-badge-delete"
                            variant="danger"
                          >
                            Delete
                          </Badge>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </>
      );
    } else {
      return (
        <>
          <h3 className="align-center">Transactions</h3>
          <p className="align-center">
            Please update your profile in order to start adding transactions.
          </p>
        </>
      );
    }
  }

  return setTransactionComp();
}

export default Transactions;
