import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
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
import axios from 'axios';

const Login = () => {
  const [newUser, setNewUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setNewUser(!newUser);
  };

  console.log(auth.currentUser)

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
        const errorCode = error.code;
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

  return (
    <div className={classes.container}>
      <picture className={classes.picture}>
        <source type='image/webp' srcSet='/public/img/image10.webp' />
        <source type='image/jpeg' srcSet='/public/img/image10.jpg' />
        <img src='/public/img/image10.png' alt='' />
      </picture>
      <h1 className={classes.titleWrapper}>Audio
        <small>It's modular and designed to last</small>
      </h1>
      <form className={classes.form}>
        <div className={classes.wrapper}>
          <Input 
            id={'email'}
            type={'email'} 
            name={'Email'}
            element={<EmailIcon />}
            value={email}
            onInput={(e: ChangeEvent<HTMLInputElement>) => 
              setEmail(e.target.value)
            }      
          />
        </div>
        <div className={classes.wrapper}>
          <Input 
            id={'password'} 
            type={'password'}
            name={'Password'}
            element={<LockIcon />} 
            value={password} 
            onInput={(e: ChangeEvent<HTMLInputElement>) => 
              setPassword(e.target.value)
            }      
          />
        </div>
        {!newUser && <p className={classes.text}>Forgot Password</p>}
        <Button 
          type={'submit'} 
          onClick={handleLogin} 
          name={newUser ? 'Sign Up' : 'Sign In'}
        />
        <div className={classes.wrapperButtons}>
          <LoginButtonWithProvider 
            type={'button'} 
            onClick={handleLoginWithFacebook} 
            icon={<FacebookIcon />} 
          />
          <LoginButtonWithProvider 
            type={'button'} 
            onClick={handleLoginWithGoogle} 
            icon={<GoogleIcon />} 
          />
        </div>
    </form>
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
          <a  href="#" onClick={handleUser}>
            Sign Up here
          </a>
        </p>
      )}
    </div>
  );
}

export default Login