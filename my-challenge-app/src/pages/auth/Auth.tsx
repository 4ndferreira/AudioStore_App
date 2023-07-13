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

import classes from './Auth.module.css'

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

  const handleUser = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
    <div>
      <h1>Audio</h1>
      <p>It's modular and designed to last</p>
      <p className={classes.wrapper}>
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
      </p>
      <p className={classes.wrapper}>
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
      </p>
      {!newUser && <p>Forgot Password</p>}
      <button onClick={handleLogin}>
        {newUser ? 'Sign Up' : 'Sign In'}
      </button>
      <button onClick={handleLoginWithFacebook}>
        Facebook
      </button>
      <button onClick={handleLoginWithGoogle}>
        Google
      </button>
      {newUser ? (
        <p>
          If you have an account? 
          <a href="#" onClick={handleUser}>
            Sign In here
          </a>
        </p>
      ) : (
        <p>
          Didn’t have any account? 
          <a href="#" onClick={handleUser}>
            Sign Up here
          </a>
        </p>
      )}
    </div>
  );
}

export default Auth