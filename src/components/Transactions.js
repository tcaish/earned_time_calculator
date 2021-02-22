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
  Spinner,
  Table
} from 'react-bootstrap';

// Exports
import { getTransactionFormatDate, modalType } from '../exports/Functions';

// Styles
import '../styles/Transaction.css';

function Transactions({
  transactions,
  summary,
  latestYear,
  setModalShow,
  setModalType,
  deleteTransaction,
  modifyTransactionSetup
}) {
  // Get a unique list of the years based on transactions
  const years = [
    ...new Set(
      transactions
        .map(t => new Date(t.date).getFullYear().toString())
        .sort((a, b) => parseInt(b) - parseInt(a))
    )
  ];

  // State for year to filter by
  const [year, setYear] = useState(latestYear);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

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
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);

            deleteTransaction(transaction)
              .then(res => setIsLoading(false))
              .catch(err => console.log(err));
          }}
        >
          {!isLoading ? (
            'Delete'
          ) : (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
            </>
          )}
        </Button>
      </Popover.Content>
    </Popover>
  );

  // Shows the modal depending on the navigation button clicked
  function showModal(modalType) {
    setModalType(modalType);
    setModalShow(true);
  }

  // Return false if the year should not be disabled based on availability
  // of the year or latestYear variables
  function checkYearDisabled() {
    if (transactions.length > 0) {
      if (year) {
        return false;
      } else if (latestYear) {
        return false;
      }
    }

    return true;
  }

  function setTransactionComp() {
    // If the user's profile is populated
    if (summary.et_rate > 0) {
      return (
        <>
          <h3 className="align-center">Transactions</h3>
          <Row>
            <Col xs={12} md={10}>
              <Button
                className="transaction-btn custom-btn-blue-outline"
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
                title={
                  year || latestYear || new Date().getFullYear().toString()
                }
                size="sm"
                disabled={checkYearDisabled()}
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
                  .filter(t => {
                    const theYear = new Date(t.date).getFullYear().toString();
                    return year ? theYear === year : theYear === latestYear;
                  }) // filter transactions by chosen year
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
                          onClick={() => modifyTransactionSetup(transaction)}
                        >
                          Edit
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
