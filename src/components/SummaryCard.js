// React
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Exports
import { SummaryCardBody, SummaryCardTooltips } from '../exports/Functions';

// Styles
import '../styles/SummaryCard.css';

function SummaryCard({ title, body }) {
  // Returns the style of the title based on the title and body
  function getClass(theTitle, theBody) {
    let theClass = 'summary-card-body-title';

    if (theBody.includes('Burn')) {
      // Change color of title to red or green based on if it's negative or
      // positive
      theClass = theTitle.toString().includes('-')
        ? 'summary-card-body-et-burn-red'
        : 'summary-card-body-et-burn-green';
    } else if (
      theBody.includes('Vacation Weeks') ||
      theBody.includes('Vacation Days')
    ) {
      // Change color of title to black or blue based on if it's 0
      theClass =
        theTitle === 0 ? 'summary-card-body-title' : 'summary-card-body-vaca';
    }

    return theClass;
  }

  // Returns the message for the appropriate summary card based on the body
  function getTooltipMessage(theBody) {
    switch (theBody) {
      case SummaryCardBody.vaca_rate:
        return SummaryCardTooltips.vaca_rate;
      case SummaryCardBody.vaca_end_year:
        return SummaryCardTooltips.vaca_end_year;
      case SummaryCardBody.vaca_to_burn:
        return SummaryCardTooltips.vaca_to_burn;
      case SummaryCardBody.vaca_weeks:
        return SummaryCardTooltips.vaca_weeks;
      case SummaryCardBody.vaca_days:
        return SummaryCardTooltips.vaca_days;
      default:
        return 'Nothing to explain here!';
    }
  }

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{getTooltipMessage(body)}</Tooltip>}
    >
      <div className="summary-card">
        <div className="summary-card-body align-center">
          <h2 className={getClass(title, body)}>{title}</h2>
          <p>{body}</p>
        </div>
      </div>
    </OverlayTrigger>
  );
}

export default SummaryCard;
