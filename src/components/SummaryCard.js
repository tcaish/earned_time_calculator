// React
import React from 'react';

// Styles
import '../styles/SummaryCard.css';

function SummaryCard({ title, body }) {
  // Set the style of the title
  function getClass(theTitle, theBody) {
    let theClass = 'summary-card-body-title';

    if (theBody.includes('Burn')) {
      // Change color of title to red or green based on if it's negative or
      // positive
      theClass = theTitle.toString().includes('-')
        ? 'summary-card-body-et-burn-red'
        : 'summary-card-body-et-burn-green';
    } else if (theBody.includes('Vacation')) {
      // Change color of title to black or blue based on if it's 0
      theClass =
        theTitle === 0 ? 'summary-card-body-title' : 'summary-card-body-vaca';
    }

    return theClass;
  }

  return (
    <div className="summary-card">
      <div className="summary-card-body align-center">
        <h2 className={getClass(title, body)}>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
