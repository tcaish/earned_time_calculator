// React
import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

// Third-party
import ReCAPTCHA from 'react-google-recaptcha';

// Styles
import '../styles/Footer.css';

function Footer() {
  // Popover containing a recaptcha before allowing user to
  // contact support
  const recaptchaPopover = (
    <Popover id="recaptchaPopover">
      <ReCAPTCHA
        sitekey="6Lf70WAaAAAAAHtQgyAQ-0P-tTUCvPWbqpbvwUl-"
        theme="dark"
        size="compact"
        onChange={captchaOnChange}
      />
    </Popover>
  );

  // Checks if the captcha successfully executed and will open up
  // email dialog for user
  function captchaOnChange(value) {
    if (value !== null) {
      window.location.href =
        'mailto:timmycaish11@gmail.com?subject=Vacation Calculator - Support';
    }
  }

  return (
    <footer id="footer">
      <p>Copyright &copy; 2021 Timothy Caish</p>

      <OverlayTrigger
        trigger="click"
        placement="auto"
        rootClose={true}
        overlay={recaptchaPopover}
      >
        <p id="contact-support-text">Contact Support</p>
      </OverlayTrigger>
    </footer>
  );
}

export default Footer;
