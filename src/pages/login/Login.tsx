//React
import { useEffect, useState } from "react";
//React Router Dom
import { useNavigate } from "react-router-dom";
//Firebase
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  AuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/Config";
//Components
import LoginForm from "../../components/loginForm/LoginForm";
//Hook
import { useMediaQuery } from "../../hooks/useMediaQuery";
//CSS
import classes from "./Login.module.css";

export default function Login() {
  //State of inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Error warning display
  const [errorCode, setErrorCode] = useState("");
  //Show sending bar
  const [submittingAuth, setSubmittingAuth] = useState(false);
  //Password reset
  const [submitted, setSubmitted] = useState("");

  const isDesktop = useMediaQuery();

  const navigate = useNavigate();

  const handleOnEmail = (newValue: string) => setEmail(newValue);

  const handleOnPassword = (newValue: string) => setPassword(newValue);

  //Authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => user && navigate("/")
    );
    return () => unsubscribe();
  }, [navigate]);
  //Login with Email
  const handleLoginWithEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmittingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((error: FirebaseError) => {
        setErrorCode(error.code);
        console.error(error.message);
      })
      .finally(() => {
        setSubmittingAuth(false);
      });
  };
  //Create user with Email
  const handleCreateUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmittingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((error: FirebaseError) => {
        setErrorCode(error.code);
        console.error(error.message);
      })
      .finally(() => {
        setSubmittingAuth(false);
      });
  };
  //Login with Provider
  const handleLoginWithProvider = async (provider: AuthProvider) => {
    await signInWithPopup(auth, provider)
      .then()
      .catch((error: FirebaseError) => {
        console.error(error.code);
        console.error(error.message);
      });
  };

  const handleLoginWithGoogle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void handleLoginWithProvider(new GoogleAuthProvider());
  };
  const handleLoginWithFacebook = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void handleLoginWithProvider(new FacebookAuthProvider());
  };
  //Reset password
  const handlePasswordReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmittingAuth(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSubmitted("We have e-mailed your password reset link");
        //setForgotPassword(false);
        setEmail("");
        setErrorCode("");
      })
      .catch((error: { code: string; message: string }) => {
        setErrorCode(error.code);
        console.error(error.message);
      })
      .finally(() => {
        setSubmittingAuth(false);
      });
  };

  return (
    <div className={classes.container}>
      {!isDesktop && (
        <>
          <picture className={classes.picture}>
            <source type="image/webp" srcSet="/img/image10.webp" />
            <source type="image/png" srcSet="/img/image10.png" />
            <img src="/img/image10.png" alt="" />
          </picture>
          <h1 className={classes.titleWrapper}>
            Audio
            <small>It's modular and designed to last</small>
          </h1>
        </>
      )}  
      <LoginForm 
        submitted={submitted}
        errorCode={errorCode}
        isSubmittingAuth={submittingAuth}
        handleOnEmail={handleOnEmail}
        handleOnPassword={handleOnPassword}
        handleLoginWithEmail={handleLoginWithEmail}
        handleCreateUser={handleCreateUser}
        handlePasswordReset={handlePasswordReset}
        handleLoginWithFacebook={handleLoginWithFacebook}
        handleLoginWithGoogle={handleLoginWithGoogle}       
      />
    </div>
  );
}
