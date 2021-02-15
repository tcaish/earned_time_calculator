// React
import React from 'react';

// Styles
import '../styles/SummaryCard.css';

function SummaryCard({ title, body }) {
  return (
    <div className="summary-card">
      <div className="summary-card-body align-center">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
