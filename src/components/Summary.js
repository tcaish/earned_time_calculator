import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import '../styles/App.css';

function Summary({ summary }) {
  return (
    <Container>
      <h3 className="align-center">Summary</h3>
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
      </Row>
    </Container>
  );
}

export default Summary;
