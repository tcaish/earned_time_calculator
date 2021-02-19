// React
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Components
import SummaryCard from './SummaryCard';

// Exports
import { SummaryCardBody } from '../exports/Functions';

// Styles
import '../styles/Summary.css';

/*
@function Summary
@description Sets up the summary component with earned time details.
@params summary The summary state object from App.js
*/
function Summary({ summary, profile }) {
  return (
    <div id="summary-container">
      <h3 className="align-center">Summary</h3>

      <Row xs={1} lg={2}>
        <Col>
          <SummaryCard
            title={summary.et_rate + ' hrs'}
            body={SummaryCardBody.vaca_rate}
            num_paychecks={profile.total_yearly_paychecks}
          />
        </Col>
        <Col>
          <SummaryCard
            title={summary.et_end_of_year + ' hrs'}
            body={SummaryCardBody.vaca_end_year}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <SummaryCard
            title={summary.et_hol_to_burn + ' hrs'}
            body={SummaryCardBody.vaca_to_burn}
          />
        </Col>
      </Row>

      <Row xs={1} lg={2}>
        <Col>
          <SummaryCard
            title={summary.total_vaca_weeks}
            body={SummaryCardBody.vaca_weeks}
          />
        </Col>
        <Col>
          <SummaryCard
            title={summary.total_vaca_days}
            body={SummaryCardBody.vaca_days}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Summary;
