// React
import React from 'react';

// React bootstrap
import { Table } from 'react-bootstrap';

// Styles
import '../styles/App.css';

/*
@function Summary
@description Sets up the summary component with earned time details.
@params summary The summary state object from App.js
*/
function Summary({ summary }) {
  return (
    <>
      <h3 className="align-center">Summary</h3>
      <Table variant="dark" size="sm">
        <tbody>
          <tr key={0} className="align-center">
            <td className="align-center align-middle">
              ET Rate (per pay period)
            </td>
            <td className="align-middle">
              <h4>{summary.et_rate} hrs</h4>
            </td>
          </tr>
          <tr key={1} className="align-center">
            <td className="align-center align-middle">ET at End of Year</td>
            <td className="align-middle">
              <h4>{summary.et_end_of_year} hrs</h4>
            </td>
          </tr>
          <tr key={2} className="align-center">
            <td className="align-center align-middle">ET/Holiday to Burn</td>
            <td className="align-middle">
              <h4>{summary.et_hol_to_burn} hrs</h4>
            </td>
          </tr>
          <tr key={3} className="align-center">
            <td className="align-center align-middle">Total Vacation Weeks</td>
            <td className="align-middle">
              <h4>{summary.total_vaca_weeks}</h4>
            </td>
          </tr>
          <tr key={4} className="align-center">
            <td className="align-center align-middle">Total Vacation Days</td>
            <td className="align-middle">
              <h4>{summary.total_vaca_days}</h4>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Summary;
