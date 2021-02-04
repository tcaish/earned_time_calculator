// React
import React from 'react';

// React bootstrap
import { Button, Table } from 'react-bootstrap';

// Exports
import { modalType } from '../exports/Functions';

// Styles
import '../styles/Transaction.css';

function Transactions({ transactions, setModalShow, setModalType }) {
  // Shows the modal depending on the navigation button clicked
  function showModal(modalType) {
    setModalType(modalType);
    setModalShow(true);
  }

  return (
    <>
      <h3 className="align-center">Transactions</h3>
      <Button
        className="transaction-btn"
        size="sm"
        variant="outline-primary"
        block
        onClick={() => showModal(modalType.transaction)}
      >
        Add Transaction
      </Button>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th className="align-center">Date</th>
            <th>Time Used (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="align-center">{transaction.date}</td>
              <td>{transaction.time_used}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Transactions;
