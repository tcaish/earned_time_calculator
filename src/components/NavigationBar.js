// React
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

// Functions
import { modalType } from '../exports/Functions';

// CSS
import '../styles/NavigationBar.css';

// Navigation bar component
function NavigationBar({ setModalShow, setModalType }) {
  // Shows the modal depending on the navigation button clicked
  function showModal(modalType) {
    setModalType(modalType);
    setModalShow(true);
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <h2 className="rockout-font">Earned Time Calculator</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => showModal(modalType.profile)}>
              Profile
            </Nav.Link>
            <Nav.Link onClick={() => showModal(modalType.settings)}>
              Settings
            </Nav.Link>
            <Nav.Link onClick={() => showModal(modalType.logout)}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
