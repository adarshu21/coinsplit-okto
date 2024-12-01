import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the GoogleOAuthProvider
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_CLIENT_ID = "284254897243-u10nrnn78q4aoej07ugek4bi38782ltv.apps.googleusercontent.com"; // Replace with your actual Google OAuth Client ID

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
