// React
import React from 'react';
import { Container, Toast } from 'react-bootstrap';

function AlertToast({ title, message }) {
  return (
    <Toast>
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
