// React
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { App } from './components/App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
