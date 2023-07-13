import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ChangeEvent, useState } from 'react';

import EmailIcon from '../../components/labelInput/EmailIcon';
import LockIcon from '../../components/labelInput/LockIcon';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import classes from './Auth.module.css'
import LoginButtonWithProvider from '../../components/loginButtonWithProvider/LoginButtonWithProvider';
import FacebookIcon from '../../components/loginButtonWithProvider/FacebookIcon';
import GoogleIcon from '../../components/loginButtonWithProvider/GoogleIcon';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'my-challenge-app-3286f.firebaseapp.com',
  projectId: 'my-challenge-app-3286f',
  storageBucket: 'my-challenge-app-3286f.appspot.com',
  messagingSenderId: '198666373346',
  appId: '1:198666373346:web:3d1148b1ccd88d383e76bb',
};

const app = initializeApp(firebaseConfig);



const Auth = () => {
  const [newUser, setNewUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = getAuth(app);

  const handleUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setNewUser(!newUser);
  };
  
  const handleLogin = () => {
    const handleEmailAndPassword = newUser
    ? createUserWithEmailAndPassword
    : signInWithEmailAndPassword;

    handleEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  }

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    })
    .catch((error: FirebaseError) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
  
    const handleLoginWithFacebook = () => {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
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
        {/* <button type='submit' onClick={handleLogin}>
          {newUser ? 'Sign Up' : 'Sign In'}
        </button> */}
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
        {/* <button type='button' onClick={handleLoginWithFacebook}>
          Facebook
        </button>
        <button type='button' onClick={handleLoginWithGoogle}>
          Google
        </button> */}
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

export default Auth