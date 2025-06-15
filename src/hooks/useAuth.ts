import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User
} from "firebase/auth";
import { use, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { FirebaseError } from "firebase/app";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [submittingAuth, setSubmittingAuth] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  //const navigate = useNavigate();

  const handleOnEmail = (newValue: string) => setEmail(newValue);

  const handleOnPassword = (newValue: string) => setPassword(newValue);

  //Authentication state observer
  useEffect(() => {
      const unsubscribe = authService.changeAuthState((user) => {
        setUser(user),
        setIsAuthenticated(user ? true : false)
      });
      return () => unsubscribe();
    }, []);
  //Login with Email
  const handleLoginWithEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmittingAuth(true);
    await authService
      .login(email, password)
      .then(() => {
        console.log("Usuário logado");
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
    await authService
      .register(email, password)
      .then(() => {
        console.log("Usuário logado");
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
    await authService
      .loginWithProvider(provider)
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
    authService
      .passwordReset(email)
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

  const handleSignOut = () => {
    authService.logout()
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.error(error.code);
      });
  };

  return {
    user,
    isAuthenticated,
    errorCode,
    submitted,
    submittingAuth,
    handleOnEmail,
    handleOnPassword,
    handleLoginWithEmail,
    handleCreateUser,
    handleLoginWithFacebook,
    handleLoginWithGoogle,
    handlePasswordReset,
    handleSignOut
  };
};
