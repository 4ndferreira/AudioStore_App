import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase/Config";
//Hooks
import { ChangeEvent, useState } from 'react';
//Icons
import EmailIcon from '../../components/labelInput/EmailIcon';
import LockIcon from '../../components/labelInput/LockIcon';
import FacebookIcon from '../../components/loginButtonWithProvider/FacebookIcon';
import GoogleIcon from '../../components/loginButtonWithProvider/GoogleIcon';
//Components
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import LoginButtonWithProvider from '../../components/loginButtonWithProvider/LoginButtonWithProvider';
//CSS
import classes from './Login.module.css'

const Login = () => {
  const [newUser, setNewUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [forgotPassword, setForgotPassword] = useState(false)
  const [errorCode, setErrorCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  async () => {
    await setPersistence(auth, browserSessionPersistence);
  };

  const handleUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setNewUser(!newUser);
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const handleEmailAndPassword = (
      (newUser)
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword
    )
    await handleEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/")
        console.log(user)
      })
      .catch((error) => {
        const errorCode: string = error.code;
        console.log(errorCode)
        setErrorCode(errorCode)
        switch (errorCode) {
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
        const errorMessage = error.message;
        console.log(errorMessage)
    });
  }

  const handleLoginWithGoogle = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      navigate("/")
      console.log(token)
    })
    .catch((error: FirebaseError) => {
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;
      console.log(errorMessage)
      const email = error.customData?.email;
      console.log(email)
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential)
    });
  }
  
  const handleLoginWithFacebook = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user)
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      navigate("/")
      console.log(accessToken)
    })
    .catch((error: FirebaseError) => {
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;
      console.log(errorMessage)
      const email = error.customData?.email;
      console.log(email)
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(credential)
    });
  }
  const handlePasswordReset = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.titleWrapper}>
        Audio
        <small>It's modular and designed to last</small>
      </h1>
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
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <p className={classes.errorText}>
            {(errorCode === "auth/user-not-found" ||
              errorCode === "auth/invalid-email" ||
              errorCode === "auth/email-already-in-use") &&
              errorMessage}
          </p>
        </div>
        {(newUser || !forgotPassword) &&
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
          />
          <p className={classes.errorText}>
            {(errorCode === "auth/weak-password" ||
              errorCode === "auth/wrong-password") &&
              errorMessage}
          </p>
        </div>}
        {!newUser && 
        <p className={classes.text} 
          onClick={()=>setForgotPassword(!forgotPassword)}
        >
          Forgot Password
        </p>}
        <Button
          type={"submit"}
          onClick={!forgotPassword ? handleLogin : handlePasswordReset}
          name={newUser ? "Sign Up" : (!forgotPassword ? "Sign In" : "Send Email")}
        />
        <div className={classes.wrapperButtons}>
          <LoginButtonWithProvider
            type={"button"}
            onClick={handleLoginWithFacebook}
            icon={<FacebookIcon />}
          />
          <LoginButtonWithProvider
            type={"button"}
            onClick={handleLoginWithGoogle}
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
      <picture className={classes.picture}>
        <source type="image/webp" srcSet="/img/image10.webp" />
        <source type="image/jpeg" srcSet="/img/image10.jpg" />
        <img src="/img/image10.jpeg" alt="" />
      </picture>
    </div>
  );
}

export default Login