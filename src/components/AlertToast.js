// React
import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

// Third-party
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { BiErrorAlt } from 'react-icons/bi';

// Exports
import { getTime } from '../exports/Functions';

// Styles
import '../styles/AlertToast.css';

function AlertToast({ title, message }) {
  const [showToast, setShowToast] = useState(true);
  const toastDelay = 5000;

  // Set the style for the toast
  function getStyle(theTitle) {
    return theTitle.includes('Success')
      ? 'alert-toast-success'
      : 'alert-toast-error';
  }

  return (
    <Toast
      className={getStyle(title)}
      show={showToast}
      onClose={() => setShowToast(false)}
      delay={toastDelay}
      autohide
    >
      <Toast.Header className="alert-toast-header">
        {title.includes('Success') ? <IoCheckmarkDoneSharp /> : <BiErrorAlt />}
        <strong className="mr-auto alert-toast-title">{title}</strong>
        <small>{getTime()}</small>
      </Toast.Header>
      <Toast.Body className="alert-toast-body">{message}</Toast.Body>
    </Toast>
  );
}

export default AlertToast;
