// React
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Amplify
import { withAuthenticator, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

// GraphQL
import { getEarnedTimeInfo } from '../graphql/queries';

// Components
import NavigationBar from './NavigationBar';
import ProfileModal from './modals/ProfileModal';
import LogoutModal from './modals/LogoutModal';
import SettingsModal from './modals/SettingsModal';
import CustomModal from './modals/CustomModal';
import Summary from './Summary';
import Transactions from './Transactions';

// Exports
import {
  initialSummaryState,
  initialTransactionsState,
  initialProfileState,
  modalType as modalFuncType
} from '../exports/Functions';

// Styles
import '../styles/App.css';
import { API } from 'aws-amplify';
import TransactionsModal from './modals/TransactionsModal';

/*
@function App
@description Sets up the App component, which is the 
  main component.
*/
function App() {
  // Authentication state
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  // Props for modal component
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState(0);

  // Summary state
  const [summary, setSummary] = useState(initialSummaryState);

  // Transactions state
  const [transactions, setTransactions] = useState(initialTransactionsState);

  // Profile state
  const [profile, setProfile] = useState(initialProfileState);

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);

      fetchETInfo();
    });
  }, []);

  // Fetches all the earned time information for the current user
  async function fetchETInfo() {
    const apiData = await API.graphql({ query: getEarnedTimeInfo, variables: { id: '0' } });

    const etInfo = apiData.data.getEarnedTimeInfo;

    setProfile({
      carry_over_et: etInfo.carry_over_et,
      used_et: etInfo.used_et,
      current_hol: etInfo.current_hol,
      hire_date_month: etInfo.hire_date_month,
      hire_date_day: etInfo.hire_date_day,
      hire_date_year: etInfo.hire_date_year,
      total_et_allowed: etInfo.total_et_allowed,
      total_yearly_paychecks: etInfo.total_yearly_paychecks
    });

    //calculateEtSummary(etInfo);
  }

  // Returns the correct modal for the navigation button pressed
  function getModal() {
    let modal;

    switch (modalType) {
      case modalFuncType.profile:
        modal = <ProfileModal profile={profile} show={modalShow} onHide={() => setModalShow(false)}/>;
        break;
      case modalFuncType.logout:
        modal = <LogoutModal show={modalShow} onHide={() => setModalShow(false)} />;
        break;
      case modalFuncType.settings:
        modal = <SettingsModal show={modalShow} onHide={() => setModalShow(false)} />;
        break;
      case modalFuncType.transactions:
        modal = <TransactionsModal show={modalShow} onHide={() => setModalShow(false)} />;
        break;
      default:
        modal = <CustomModal title="Error" body="There was an error executing your request!" show={modalShow} onHide={() => setModalShow(false)} />;
        break;
    }

    return modal;
  }

  return authState === AuthState.SignedIn && user ? (
    <>
      <NavigationBar setModalShow={setModalShow} setModalType={setModalType} />

      <Container id="app-container">
        <Row>
          <Col>
            <Summary summary={summary} />
          </Col>
          <Col className="app-col">
            <Transactions
              transactions={transactions}
              summary={summary}
              setModalShow={setModalShow}
              setModalType={setModalType}
            />
          </Col>
        </Row>
      </Container>

      {/* Modals for settings, profile, and logout */}
      {
        getModal()
      }
    </>
  ) : (
    <AmplifyAuthenticator />
  );
}

export default withAuthenticator(App);
