// React
import React from 'react';

// React bootstrap
import { Container, Row, Col, Table } from 'react-bootstrap';

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
            <td>
              <h4>{summary.et_rate} hrs</h4>
            </td>
          </tr>
          <tr key={1} className="align-center">
            <td className="align-center align-middle">ET at End of Year</td>
            <td>
              <h4>{summary.et_end_of_year} hrs</h4>
            </td>
          </tr>
          <tr key={2} className="align-center">
            <td className="align-center align-middle">ET/Holiday to Burn</td>
            <td>
              <h4>{summary.et_hol_to_burn} hrs</h4>
            </td>
          </tr>
          <tr key={3} className="align-center">
            <td className="align-center align-middle">Total Vacation Weeks</td>
            <td>
              <h4>{summary.total_vaca_weeks}</h4>
            </td>
          </tr>
          <tr key={4} className="align-center">
            <td className="align-center align-middle">Total Vacation Days</td>
            <td>
              <h4>{summary.total_vaca_days}</h4>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* <h3 className="align-center">Summary</h3>
      <Row>
        <Col xs={8} md={8} className="container-col">
          ET Rate (per pay period):
        </Col>
        <Col>{summary.et_rate} hrs</Col>
      </Row>
      <Row>
        <Col xs={8} md={8} className="container-col">
          ET at End of Year:
        </Col>
        <Col>{summary.et_end_of_year} hrs</Col>
      </Row>
      <Row>
        <Col xs={12} md={8} className="container-col">
          ET/Holiday to Burn:
        </Col>
        <Col>{summary.et_hol_to_burn} hrs</Col>
      </Row>
      <Row>
        <Col xs={8} md={8} className="container-col">
          Total Vacation Weeks:
        </Col>
        <Col>{summary.total_vaca_weeks} week(s)</Col>
      </Row>
      <Row>
        <Col xs={8} md={8} className="container-col">
          Total Vacation Days:
        </Col>
        <Col>{summary.total_vaca_days} days</Col>
      </Row> */}
    </>
  );
}

export default Summary;
