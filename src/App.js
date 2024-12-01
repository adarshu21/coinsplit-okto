import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OktoProvider, BuildType } from "okto-sdk-react"; // Import Okto SDK
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import Int from "./pages/Int";
import Ques from "./pages/Ques";
import Socials from "./pages/socials";
import Profile from "./pages/profile";

const OKTO_CLIENT_API_KEY = "d2955b19-ba28-4645-9241-a3798b9b7e57"; // Replace with your Okto API key

function App() {
  const handleGoogleLogin = (response) => {
    console.log('Google Login Success:', response);
    // Handle Google login success
  };

  const handleGoogleError = (error) => {
    console.log('Google Login Error:', error);
    // Handle Google login failure
  };

  return (
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <Router>
        <div className="App">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleError}
          />
          <Routes>
            <Route path="/" element={<Int />} />
            <Route path="/Ques" element={<Ques />} />
            <Route path="/Socials" element={<Socials />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </OktoProvider>
  );
}

export default App;
