// React
import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

function AlertToast({ title, message }) {
  const [showToast, setShowToast] = useState(true);

  return (
    <Toast
      show={showToast}
      onClose={() => setShowToast(false)}
      delay={5000}
      autohide
    >
      <Toast.Header>
        {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
        <strong className="mr-auto">{title}</strong>
        {/* <small>just now</small> */}
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default AlertToast;
