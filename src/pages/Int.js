import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import Google Login
import { useOkto } from "okto-sdk-react"; // Import Okto SDK

const Int = () => {
  const navigate = useNavigate();
  const { authenticate } = useOkto(); // Okto authentication hook
  const [authToken, setAuthToken] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => setShowWelcome(false), 3000);
    const overlayTimer = setTimeout(() => setShowOverlay(true), 3500);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(overlayTimer);
    };
  }, []);

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential; // Get the Google ID token
    authenticate(idToken, (authResponse, error) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token); // Set auth token after successful login
        console.log("Authenticated successfully, auth token:", authResponse.auth_token);
      } else if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  return (
    <div style={styles.container}>
      <video
        src="/socials.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        style={styles.video}
      />
      {showWelcome && (
        <div style={styles.centerText}>
          <p style={styles.welcomeText}>Welcome to CoinSplit</p>
        </div>
      )}
      {showOverlay && (
        <div style={styles.overlay}>
          <p style={styles.logInTitle}>Log In to Continue</p>
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onClick={() => setShowPopup(true)}
            >
              Log In
            </button>
            <button
              style={styles.button}
              onClick={() => navigate("/ques")}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2 style={styles.popupTitle}>Connect Your Wallet</h2>
            <p style={styles.popupText}>
              To continue, please connect your Web3 wallet.
            </p>
            <GoogleLogin
              onSuccess={handleGoogleLogin} // On success, handle Google login
              onError={(error) => console.error("Login Failed", error)}
            />
            <button
              style={styles.closeButton}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  },
  centerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    animation: "fadeOut 3s ease-in-out",
  },
  welcomeText: {
    fontSize: "80px",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: "3px",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 2s ease-in-out",
  },
  logInTitle: {
    fontSize: "100px",
    color: "#fff",
    marginBottom: "30px",
    fontWeight: "bold",
    letterSpacing: "4px",
    textAlign: "center",
    textShadow: "3px 3px 10px rgba(0, 0, 0, 0.8)",
  },
  buttonContainer: {
    display: "flex",
    gap: "40px",
  },
  button: {
    backgroundColor: "transparent",
    color: "#fff",
    padding: "20px 40px",
    fontSize: "24px",
    border: "2px solid #fff",
    borderRadius: "40px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "400px",
    padding: "30px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
    animation: "glassyEffect 0.5s ease-in-out",
    textAlign: "center",
  },
  popupTitle: {
    fontSize: "30px",
    color: "#fff",
    marginBottom: "20px",
  },
  popupText: {
    fontSize: "18px",
    color: "#ccc",
    marginBottom: "30px",
  },
  connectButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "15px 30px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
  closeButton: {
    backgroundColor: "transparent",
    color: "#fff",
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    border: "2px solid #fff",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default Int;