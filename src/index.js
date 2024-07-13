import React from 'react';
import ReactDOM from 'react-dom/client';

// AdminLTE is a popular open-source dashboard and control panel template built with Bootstrap. 
// To include AdminLTE in your app:
// Importing CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// Importing JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/js/adminlte.min.js';


// Add bootstrap theme Spacelab from bootswatch (adopted by ISANDEX):
import "bootswatch/dist/spacelab/bootstrap.css";

import './styles/isandex.css';  // Import your custom CSS file
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
