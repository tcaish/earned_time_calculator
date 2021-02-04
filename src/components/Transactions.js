import React from 'react';

import { Table } from 'react-bootstrap';

function Transactions({ transactions }) {
  return (
    <>
      <h3 className="align-center">Transactions</h3>
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
