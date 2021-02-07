// React
import React from 'react';
import ReactDOM from 'react-dom';

// Amplify
import Amplify from 'aws-amplify';
import config from './aws-exports';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import App from './components/App';

Amplify.configure(config);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
