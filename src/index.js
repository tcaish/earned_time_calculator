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

<<<<<<< HEAD
=======
// Configure the amplify project with config
>>>>>>> 580f3d95c99f0e6446a213943eb617404796cf3c
Amplify.configure(config);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
