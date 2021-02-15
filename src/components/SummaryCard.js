// React
import React from 'react';

// Styles
import '../styles/SummaryCard.css';

function SummaryCard({ title, body }) {
  // Set the style of the title
  function getClass(theBody) {
    let theClass = 'summary-card-body-title';

    if (theBody.includes('Burn')) {
      theClass = 'summary-card-body-et-burn';
    } else if (theBody.includes('Vacation')) {
      theClass = 'summary-card-body-vaca';
    }

    return theClass;
  }

  return (
    <div className="summary-card">
      <div className="summary-card-body align-center">
        <h2 className={getClass(body)}>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
