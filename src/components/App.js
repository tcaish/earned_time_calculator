// React
import React, { useState, useEffect } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';

// Amplify
import { withAuthenticator, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

// GraphQL
import { getEarnedTimeInfo } from '../graphql/queries';
import { updateEarnedTimeInfo as updateEarnedTimeInfoMutation } from '../graphql/mutations';

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

  // Props for modal components
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState(0);

  // Props for summary component
  const [summary, setSummary] = useState(initialSummaryState);

  // Props for transactions component
  const [transactions, setTransactions] = useState(initialTransactionsState);

  // Props for profile component
  const [profile, setProfile] = useState(initialProfileState);

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  // This updates the authentication information upon load
  // This fetches the earned time information for the user upon load
  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);

      fetchEtInfo();
    });
  }, []);

  // Fetches all the earned time information for the current user
  async function fetchEtInfo() {
    const apiData = await API.graphql({
      query: getEarnedTimeInfo,
      variables: { id: '0' }
    });

    const etInfo = apiData.data.getEarnedTimeInfo;
    setProfile({ ...etInfo });
  }

  // Updates the earned time information for the user in the database
  async function updateEtInfo(theFormData) {
    await API.graphql({
      query: updateEarnedTimeInfoMutation,
      variables: { input: theFormData }
    })
      .then(res => {
        setAlertText('Profile updated successfully!');
        setModalShow(false);
        setShowAlert(true);
      })
      .catch(err => {
        alert(
          'There was an error updating your profile: ' + JSON.stringify(err)
        );
      });

    setProfile({ ...theFormData });
  }

  // Returns the correct modal for the navigation button pressed
  function getModal(theProfile) {
    let modal;

    switch (modalType) {
      case modalFuncType.profile:
        modal = (
          <ProfileModal
            profile={theProfile}
            updateProfile={updateEtInfo}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        );
        break;
      case modalFuncType.logout:
        modal = (
          <LogoutModal show={modalShow} onHide={() => setModalShow(false)} />
        );
        break;
      case modalFuncType.settings:
        modal = (
          <SettingsModal show={modalShow} onHide={() => setModalShow(false)} />
        );
        break;
      case modalFuncType.transactions:
        modal = (
          <TransactionsModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        );
        break;
      default:
        modal = (
          <CustomModal
            title="Error"
            body="There was an error executing your request!"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        );
        break;
    }

    return modal;
  }

  return authState === AuthState.SignedIn && user ? (
    <>
      <NavigationBar setModalShow={setModalShow} setModalType={setModalType} />

      <Container>
        {showAlert && modalType === modalFuncType.profile && (
          <Alert
            className="align-center"
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertText}
          </Alert>
        )}
      </Container>

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
      {profile.userId !== '' && getModal(profile)}
    </>
  ) : (
    <AmplifyAuthenticator />
  );
}

export default withAuthenticator(App);
