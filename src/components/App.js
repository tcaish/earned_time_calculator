// React
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import NavigationBar from './NavigationBar';
import EtcModal from './EtcModal';
import Summary from './Summary';
import Transactions from './Transactions';

// Exports
import {
  modalType,
  initialSummaryState,
  initialTransactionsState
} from '../exports/Functions';

// CSS
import '../styles/App.css';

function App() {
  // Props for modal component
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState(0);

  const [summary, setSummary] = useState(initialSummaryState);

  const [transactions, setTransactions] = useState(initialTransactionsState);

  return (
    <>
      <NavigationBar setModalShow={setModalShow} setModalType={setModalType} />

      <Container>
        <Row>
          <Col className="app-col">
            <Summary summary={summary} />
          </Col>
          <Col className="app-col">
            <Transactions transactions={transactions} />
          </Col>
        </Row>
      </Container>

      {/* Modals for settings, profile, and logout */}
      <EtcModal
        type={modalType}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export { App, modalType };
