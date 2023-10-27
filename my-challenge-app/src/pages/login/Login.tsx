//React
import { ChangeEvent, useEffect, useState } from 'react';
//React Router Dom
import { useNavigate } from 'react-router-dom';
//Firebase
import { FirebaseError } from 'firebase/app';
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
//Icons
import EmailIcon from '../../components/icons/EmailIcon';
import LockIcon from '../../components/icons/LockIcon';
import FacebookIcon from '../../components/icons/FacebookIcon';
import GoogleIcon from '../../components/icons/GoogleIcon';
//Components
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import LoginButtonWithProvider from '../../components/loginButtonWithProvider/LoginButtonWithProvider';
import Sending from '../../components/submitting/Submitting';
//Hook
import { useMediaQuery } from '../../hooks/useMediaQuery';
//CSS
import classes from './Login.module.css'

export default function Login() {
  //State of inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //Control login screen to be displayed
  const [newUser, setNewUser] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  //Error warning display
  const [errorCode, setErrorCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  //Show sending bar
  const [submitting, setSubmitting] = useState(false)
  //Password reset
  const [submitted, setSubmitted] = useState('')
  
  const isDesktop = useMediaQuery();
  
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  //Control login screen to be displayed
  const handleUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setNewUser(!newUser);
    setForgotPassword(false)
  };
  //Login with Email
  const handleLoginWithEmail = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setSubmitting(true)
    const handleEmailAndPassword = (
      (newUser)
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword
    )
    await handleEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userID = userCredential.user.uid;
        console.log("user: ", userID);
        setSubmitting(false);
        setEmail('');
        setPassword('')
      })
      .catch((error: {
        code: string;
        message: string; 
      }) => {
        setErrorCode(error.code)
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage('User not found!');
            break;
          case 'auth/invalid-email':
            setErrorMessage('Invalid email');
            break;
          case 'auth/email-already-in-use':
            setErrorMessage('Email already in use!');
            break;
          case 'auth/wrong-password':
            setErrorMessage('Wrong password!');
            break;
          case 'auth/weak-password':
            setErrorMessage('Password should be at least 6 characters!');
            break;
          default:
            setErrorMessage('An error occurred!');
        }
        console.error(error.message);
        setSubmitting(false)
    });
  }
  //Login with Provider
  const Google = new GoogleAuthProvider();
  const Facebook = new FacebookAuthProvider();
  const handleLoginWithProvider = async (provider: AuthProvider) => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userID = result.user.uid;
        console.log("user: ", userID);
      })
      .catch((error: FirebaseError) => {
        console.error(error.code);
        console.error(error.message);
      });
  };
  const googleLoginHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void handleLoginWithProvider(Google);
  };
  const facebookLoginHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void handleLoginWithProvider(Facebook);
  };
  //Reset password
  const handlePasswordReset = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setSubmitting(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!')
        setSubmitting(false)
        setSubmitted('We have e-mailed your password reset link')
        setForgotPassword(false)
        setEmail('')
        setErrorCode('')
      })
      .catch((error: {
        code: string;
        message: string; 
      }) => {
        setErrorCode(error.code)
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage('User not found!');
            break;
          case 'auth/invalid-email':
            setErrorMessage('Invalid email');
            break;
          default:
            setErrorMessage('An error occurred!');
        }
        console.error(error.message)
        setSubmitting(false)
      })
  }

  return (
    <div className={classes.container}>
      {!isDesktop && <>
        <picture className={classes.picture}>
          <source type="image/webp" srcSet="/img/image10.webp" />
          <source type="image/png" srcSet="/img/image10.png" />
          <img src="/img/image10.png" alt="" />
        </picture>
        <h1 className={classes.titleWrapper}>
          Audio
          <small>It's modular and designed to last</small>
        </h1>
      </>}
      <p className={classes.resetPasswordText}>{submitted}</p>
      <form className={classes.form}>
        <div
          className={
            errorCode 
              ? `${classes.wrapper} ${classes.error}` 
              : classes.wrapper
          }
        >
          <Input
            id={"email"}
            type={"email"}
            name={"Email"}
            element={<EmailIcon />}
            value={email}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setSubmitted("");
            }}
            onFocus={()=>setErrorCode("")}
          />
          <p className={classes.errorText}>
            {(errorCode === "auth/user-not-found" ||
              errorCode === "auth/invalid-email" ||
              errorCode === "auth/email-already-in-use") &&
              errorMessage}
          </p>
        </div>
        {(newUser || !forgotPassword) && (
          <div
            className={
              errorCode
                ? `${classes.wrapper} ${classes.error}`
                : classes.wrapper
            }
          >
            <Input
              id={"password"}
              type={"password"}
              name={"Password"}
              element={<LockIcon />}
              value={password}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              onFocus={()=>setErrorCode("")}
            />
            <p className={classes.errorText}>
              {(errorCode === "auth/weak-password" ||
                errorCode === "auth/wrong-password") &&
                errorMessage}
            </p>
          </div>
        )}
        {!newUser && !forgotPassword && (
          <p
            className={classes.text}
            onClick={() => {
              setForgotPassword(!forgotPassword);
              setErrorCode("");
            }}
          >
            Forgot Password
          </p>
        )}
        <div className={classes.wrapperSendButton}>
          <Button
            type={"submit"}
            onClick={
              !forgotPassword ? handleLoginWithEmail : handlePasswordReset
            }
          >
            {newUser ? "Sign Up" : !forgotPassword ? "Sign In" : "Send Email"}
          </Button>
          {submitting && <Sending />}
        </div>
        <div className={classes.wrapperButtons}>
          <LoginButtonWithProvider
            type={"button"}
            onClick={facebookLoginHandler}
            icon={<FacebookIcon />}
          />
          <LoginButtonWithProvider
            type={"button"}
            onClick={googleLoginHandler}
            icon={<GoogleIcon />}
          />
        </div>
        {newUser ? (
          <p className={classes.textFooter}>
            If you have an account?
            <a href="#" onClick={handleUser}>
              Sign In here
            </a>
          </p>
        ) : (
          <p className={classes.textFooter}>
            Didn’t have any account?
            <a href="#" onClick={handleUser}>
              Sign Up here
            </a>
          </p>
        )}
      </form>
    </div>
  );
}