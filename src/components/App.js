// React
import React, { useState, useEffect } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';

// Amplify
import { API } from 'aws-amplify';
import {
  AmplifyAuthenticator,
  AmplifyConfirmSignUp,
  AmplifyForgotPassword,
  AmplifySignIn,
  AmplifySignUp
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

// GraphQL
import { getEarnedTimeInfo, listTransactions } from '../graphql/queries';
import {
  updateEarnedTimeInfo as updateEarnedTimeInfoMutation,
  createEarnedTimeInfo as createEarnedTimeInfoMutation,
  deleteTransaction as deleteTransactionMutation,
  updateTransaction as updateTransactionMutation,
  createTransaction as createTransactionMutation
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
import AlertToast from './AlertToast';

// Exports
import {
  initialSummaryState,
  initialProfileState,
  modalType as modalFuncType,
  getSummaryValues
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
  const [transactions, setTransactions] = useState([]);
  const [latestYear, setLatestYear] = useState('');

  // Props for profile component
  const [profile, setProfile] = useState(initialProfileState);

  // Alert states
  const [alerts, setAlerts] = useState([]);

  // This updates the authentication information upon load
  // This fetches the earned time information for the user upon load
  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);

      if (authData !== undefined) {
        setAlerts([]);
        fetchEtInfo(authData.username);
      }
    });
  }, []);

  // ---------------------------------------------------------------------------
  // AWS Functions to update database
  // ---------------------------------------------------------------------------

  // Creates the initial earned time information for the user if
  // nothing is there for them yet
  async function createInitialEtInfo(theFormData) {
    theFormData = { ...theFormData, userId: user.username, id: user.username };

    await API.graphql({
      query: createEarnedTimeInfoMutation,
      variables: { input: theFormData }
    })
      .then(res => {
        setProfile(res.data.createEarnedTimeInfo);
        setSummary(getSummaryValues(res.data.createEarnedTimeInfo));

        addAlert({
          id: alerts.length + 1,
          title: 'Success',
          message: 'Profile successfully updated!'
        });

        setModalShow(false);
        // startTimer();
        return;
      })
      .catch(err => {
        // console.log(err);
        addAlert({
          id: alerts.length + 1,
          title: 'Error',
          message:
            'There was an issue updating your profile for the first' +
            ' time. Please refresh and try again!'
        });

        setModalShow(false);
        return;
      });
  }

  // Fetches all the earned time information for the current user
  async function fetchEtInfo(username) {
    // Get the earned time information
    const etInfo = await API.graphql({
      query: getEarnedTimeInfo,
      variables: { id: username }
    })
      .then(res => {
        const etInfo = res.data.getEarnedTimeInfo;
        setProfile({ ...etInfo });
        return etInfo;
      })
      .catch(err => {
        // nothing to report here, just catching error
        //console.log('error getting et info: ' + JSON.stringify(err));
        return null;
      });

    fetchTransactions(etInfo);
  }

  // Fetches all the transactions for the current user
  async function fetchTransactions(etInfo) {
    // Check if etInfo is coming in null from fetchEtInfo()
    if (etInfo !== null) {
      const etTransactions = await API.graphql({
        query: listTransactions
      })
        .then(res => {
          const transList = res.data.listTransactions.items;
          setTransactions(transList);
          setLatestYear(
            transList
              .map(t => new Date(t.date).getFullYear().toString())
              .sort((a, b) => parseInt(b) - parseInt(a))[0]
          );
          return transactions;
        })
        .catch(err => {
          // console.log(err);
          addAlert({
            id: alerts.length + 1,
            title: 'Error',
            message:
              'There was an issue fetching your transactions. Please' +
              ' refresh the page!'
          });

          setModalShow(false);
          return null;
        });

      // Update the summary now that we have all the information
      if (etInfo !== null) {
        setSummary(getSummaryValues(etInfo, etTransactions));
      }
    }
  }

  // Updates the earned time information for the user in the database
  async function updateEtInfo(theFormData) {
    // If user is updating their profile for the first time
    if (profile.userId === undefined || profile.userId === '') {
      createInitialEtInfo(theFormData);
      return;
    }

    // If when a user goes to update their profile for a second time before
    // reloading, add the userId and id fields from the profile
    if (theFormData.userId === undefined || theFormData.id === undefined) {
      theFormData.userId = profile.userId;
      theFormData.id = profile.id;
    }

    await API.graphql({
      query: updateEarnedTimeInfoMutation,
      variables: { input: theFormData }
    })
      .then(res => {
        setProfile(res.data.updateEarnedTimeInfo);
        setSummary({
          ...getSummaryValues(res.data.updateEarnedTimeInfo, transactions)
        });

        addAlert({
          id: alerts.length + 1,
          title: 'Success',
          message: 'Profile successfully updated!'
        });

        setModalShow(false);
        // startTimer();
        return;
      })
      .catch(err => {
        // console.log(err);
        addAlert({
          id: alerts.length + 1,
          title: 'Error',
          message:
            'There was an issue updating your profile. Please' +
            ' refresh and try again!'
        });

        setModalShow(false);
        return;
      });
  }

  // Adds a transaction to the table
  async function addTransaction(theTransaction) {
    await API.graphql({
      query: createTransactionMutation,
      variables: { input: theTransaction }
    })
      .then(res => {
        const theTransactions = [...transactions, res.data.createTransaction];

        setTransactions(theTransactions);
        setLatestYear(
          theTransactions
            .map(t => new Date(t.date).getFullYear().toString())
            .sort((a, b) => parseInt(b) - parseInt(a))[0]
        );
        setSummary({ ...getSummaryValues(profile, theTransactions) });

        addAlert({
          id: alerts.length + 1,
          title: 'Success',
          message: 'Transaction added successfully!'
        });

        setModalShow(false);
        // startTimer();
        return;
      })
      .catch(err => {
        // console.log(err);
        addAlert({
          id: alerts.length + 1,
          title: 'Error',
          message:
            'There was an issue adding the transaction. Please try' + ' again!'
        });

        setModalShow(false);
        return;
      });
  }

  // Deletes a transaction from the table
  async function deleteTransaction({ id }) {
    if (id !== undefined && id !== null) {
      await API.graphql({
        query: deleteTransactionMutation,
        variables: { input: { id } }
      })
        .then(res => {
          const theTransactions = [...transactions].filter(t => t.id !== id);

          setTransactions(theTransactions);
          setLatestYear(
            theTransactions
              .map(t => new Date(t.date).getFullYear().toString())
              .sort((a, b) => parseInt(b) - parseInt(a))[0]
          );
          setSummary({ ...getSummaryValues(profile, theTransactions) });

          addAlert({
            id: alerts.length + 1,
            title: 'Success',
            message: 'Transaction deleted successfully!'
          });

          // startTimer();
          return;
        })
        .catch(err => {
          // console.log(err);
          addAlert({
            id: alerts.length + 1,
            title: 'Success',
            message:
              'There was an issue deleting the transaction. Please' +
              ' try again!'
          });

          setModalShow(false);
          return;
        });
    }
  }

  // Modifies a transactions from the table
  async function modifyTransaction(theTransaction) {
    if (theTransaction.id !== undefined && theTransaction.id !== null) {
      console.log('Modifying: ' + theTransaction);
    }
  }

  // ---------------------------------------------------------------------------
  // Custom functions
  // ---------------------------------------------------------------------------

  // Add an alert to the array
  function addAlert(new_alert) {
    setAlerts([...alerts, new_alert]);
  }

  // Returns the correct modal for the navigation button pressed
  function getModal(theProfile, theUser) {
    let modal;

    switch (modalType) {
      case modalFuncType.profile:
        modal = (
          <ProfileModal
            profile={theProfile}
            user={theUser}
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
            addTransaction={addTransaction}
            profile={profile}
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

  // ---------------------------------------------------------------------------
  // MAIN
  // ---------------------------------------------------------------------------

  return authState === AuthState.SignedIn && user ? (
    <>
      <NavigationBar setModalShow={setModalShow} setModalType={setModalType} />

      <Container id="app-container">
        <Row>
          <Col>
            <Summary summary={summary} profile={profile} />
          </Col>
          <Col id="trans-col">
            <Transactions
              transactions={transactions}
              summary={summary}
              latestYear={latestYear}
              setModalShow={setModalShow}
              setModalType={setModalType}
              deleteTransaction={deleteTransaction}
              modifyTransaction={modifyTransaction}
            />
          </Col>
        </Row>
      </Container>

      {/* Setting up the toasts */}
      <div className="toast-container">
        {alerts.length > 0 &&
          alerts.map(alert => (
            <AlertToast
              key={alert.id}
              title={alert.title}
              message={alert.message}
            />
          ))}
      </div>

      {/* Modals for transactions, settings, profile, and logout */}
      {profile.userId !== '' && getModal(profile, user)}
    </>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        headerText="Create a New Account"
        usernameAlias="email"
        formFields={[
          {
            type: 'email',
            label: '*Email',
            placeholder: 'username@domain.com',
            required: true
          },
          {
            type: 'password',
            label: '*Password',
            placeholder: '',
            required: true
          }
        ]}
      />

      <AmplifyConfirmSignUp
        headerText="Confirm Your Email Address"
        slot="confirm-sign-up"
        usernameAlias="email"
        user={user}
      ></AmplifyConfirmSignUp>

      <AmplifySignIn
        slot="sign-in"
        headerText="Sign In"
        usernameAlias="email"
      />

      <AmplifyForgotPassword
        headerText="Reset Your Password"
        slot="forgot-password"
        usernameAlias="email"
      ></AmplifyForgotPassword>
    </AmplifyAuthenticator>
  );
}

export default App;
