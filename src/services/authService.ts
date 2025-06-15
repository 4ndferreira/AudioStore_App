import {
  AuthProvider,
  createUserWithEmailAndPassword,
  NextOrObserver,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase/Config";

export const authService = {
  login: async (email: string, password: string) =>
    await signInWithEmailAndPassword(auth, email, password),
  register: async (email: string, password: string) =>
    await createUserWithEmailAndPassword(auth, email, password),
  loginWithProvider: async (provider: AuthProvider) =>
    await signInWithPopup(auth, provider),
  passwordReset: async (email: string) =>
    await sendPasswordResetEmail(auth, email),
  logout: () => signOut(auth),
  changeAuthState: (callback: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callback),
  getCurrentUser: () => auth.currentUser,
};
