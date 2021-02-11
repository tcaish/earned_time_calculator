// React
import React from 'react';

// React bootstrap
import { Badge, Button, Table } from 'react-bootstrap';

// Exports
import { modalType } from '../exports/Functions';

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
  const row_style = debit => {
    if (debit) {
      return 'row-debit';
    } else {
      return 'row-credit';
    }
  };

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
          <Button
            className="transaction-btn"
            size="sm"
            variant="outline-primary"
            block
            onClick={() => showModal(modalType.transactions)}
          >
            Add Transaction
          </Button>
          <Table bordered striped hover variant="dark" size="sm">
            <thead>
              <tr>
                <th className="align-center">Date</th>
                <th className="align-center">Type</th>
                <th className="align-center">Time Used (hrs)</th>
                <th className="align-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort in decsending order
                .map(transaction => (
                  <tr key={transaction.id}>
                    <td className="align-center">{transaction.date}</td>
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
                      <Badge
                        className="trans-badge trans-badge-delete"
                        variant="danger"
                        onClick={() => deleteTransaction(transaction)}
                      >
                        Delete
                      </Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
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
