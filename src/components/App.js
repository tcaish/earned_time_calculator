// React
import React, { useState, useEffect } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';

// Amplify
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

// GraphQL
import { getEarnedTimeInfo } from '../graphql/queries';
import {
  updateEarnedTimeInfo as updateEarnedTimeInfoMutation,
  createEarnedTimeInfo as createEarnedTimeInfoMutation
} from '../graphql/mutations';

// Components
import NavigationBar from './NavigationBar';
import Summary from './Summary';
import Transactions from './Transactions';
import ProfileModal from './modals/ProfileModal';
import LogoutModal from './modals/LogoutModal';
import SettingsModal from './modals/SettingsModal';
import TransactionsModal from './modals/TransactionsModal';
import CustomModal from './modals/CustomModal';

// Exports
import {
  initialSummaryState,
  initialTransactionsState,
  initialProfileState,
  modalType as modalFuncType
} from '../exports/Functions';

// Styles
import '../styles/App.css';

/*
@function App
@description Sets up the App component, which is the 
  main component.
*/
function App() {
  // Authentication state
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

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

      fetchEtInfo(authData.username);
    });
  }, []);

  // Creates the initial earned time information for the user if
  // nothing is there for them yet
  async function createInitialEtInfo(theFormData) {
    theFormData = { ...theFormData, userId: user.username };

    await API.graphql({
      query: createEarnedTimeInfoMutation,
      variables: { input: theFormData }
    });

    setProfile({ ...theFormData });
  }

  // Fetches all the earned time information for the current user
  async function fetchEtInfo(username) {
    await API.graphql({
      query: getEarnedTimeInfo,
      variables: { userId: username }
    })
      .then(res => {
        const etInfo = res.data.getEarnedTimeInfo;
        console.log(etInfo);
        setProfile({ ...etInfo });
        return;
      })
      .catch(err => {
        // console.log('error: ' + JSON.stringify(err));
        // nothing to report here, just catching error
        return;
      });
  }

  // Updates the earned time information for the user in the database
  async function updateEtInfo(theFormData) {
    // If certain form data isn't filled in, do it automatically
    if (!theFormData.used_et) {
      theFormData.used_et = 0;
    }
    if (!theFormData.current_hol) {
      theFormData.current_hol = 0;
    }

    if (profile.userId === undefined) {
      createInitialEtInfo(theFormData);
      return;
    }

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
      {getModal(profile)}
    </>
  ) : (
    <AmplifyAuthenticator />
  );
}

export default withAuthenticator(App);
