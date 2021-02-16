// React
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Components
import SummaryCard from './SummaryCard';

// Styles
import '../styles/Summary.css';

/*
@function Summary
@description Sets up the summary component with earned time details.
@params summary The summary state object from App.js
*/
function Summary({ summary }) {
  return (
    <div id="summary-container">
      <h3 className="align-center">Summary</h3>

      <Row xs={1} lg={2}>
        <Col>
          <SummaryCard
            title={summary.et_rate + ' hrs'}
            body={'ET Rate (per pay period)'}
          />
        </Col>
        <Col>
          <SummaryCard
            title={summary.et_end_of_year + ' hrs'}
            body={'ET at End of Year'}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <SummaryCard
            title={summary.et_hol_to_burn + ' hrs'}
            body={'ET/Holiday to Burn'}
          />
        </Col>
      </Row>

      <Row xs={1} lg={2}>
        <Col>
          <SummaryCard
            title={summary.total_vaca_weeks}
            body={'Total Vacation Weeks'}
          />
        </Col>
        <Col>
          <SummaryCard
            title={summary.total_vaca_days}
            body={'Total Vacation Days'}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Summary;
