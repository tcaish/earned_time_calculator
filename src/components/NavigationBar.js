// React
import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';

// Exports
import { modalType } from '../exports/Functions';

// Styles
import '../styles/NavigationBar.css';

// Images
import logo from '../img/logo2.png';

// Navigation bar component
function NavigationBar({ setModalShow, setModalType }) {
  // Shows the modal depending on the navigation button clicked
  function showModal(modalType) {
    setModalType(modalType);
    setModalShow(true);
  }

  return (
    <Navbar id="navigation-bar" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Image id="logo" src={logo} fluid />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => showModal(modalType.profile)}>
              Profile
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
