import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from 'react';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'my-challenge-app-3286f.firebaseapp.com',
  projectId: 'my-challenge-app-3286f',
  storageBucket: 'my-challenge-app-3286f.appspot.com',
  messagingSenderId: '198666373346',
  appId: '1:198666373346:web:3d1148b1ccd88d383e76bb',
};

const app = initializeApp(firebaseConfig);
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

const Auth = () => {
  const auth = getAuth(app);
  const [newUser, setNewUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
    });
  }

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log(token)
      console.log(user)
    }).catch((error: FirebaseError) => {
      // Handle Errors here.
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
    const handleLoginWithFacebook = () => {
      signInWithPopup(auth, providerFacebook)
      .then((result) => {
        const user = result.user;
        console.log(user)
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
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
  console.log(newUser)
  return (
    <div>
      <h1>Audio</h1>
      <p>It's modular and designed to last</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>{newUser ? 'Sign Up' : 'Sign In'}</button>
      <button onClick={handleLoginWithFacebook}>Facebook</button>
      <button onClick={handleLoginWithGoogle}>Google</button>
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