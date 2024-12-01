// src/googleConfig.js
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginComponent = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // You can use the response to get user data here
    setUser(response);
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <div>
      {!user ? (
        <GoogleLogin 
          onSuccess={handleLoginSuccess} 
          onError={handleLoginFailure} 
        />
      ) : (
        <div>Welcome, {user?.profileObj?.name}</div>
      )}
    </div>
  );
};

export default GoogleLoginComponent;
