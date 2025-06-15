import { MouseEventHandler, useEffect, useState } from "react";
import Button from "../button/Button";
import EmailIcon from "../icons/EmailIcon";
import LockIcon from "../icons/LockIcon";
import Input from "../input/Input";
import LoaderForAuthProgress from "../loaderForAuthProgress/LoaderForAuthProgress";
import LoginWithProviders from "../loginWithProviders";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  sendPasswordReset: boolean;
  errorCode: string;
  isSubmittingAuth: boolean;
  handleOnEmail: (newValue: string) => void;
  handleOnPassword: (newValue: string) => void;
  handleLoginWithEmail: MouseEventHandler<HTMLButtonElement>;
  handleCreateUser: MouseEventHandler<HTMLButtonElement>;
  handlePasswordReset: MouseEventHandler<HTMLButtonElement>;
  handleLoginWithFacebook: MouseEventHandler<HTMLButtonElement>;
  handleLoginWithGoogle: MouseEventHandler<HTMLButtonElement>;
}

export default function LoginForm({
  sendPasswordReset,
  errorCode,
  isSubmittingAuth,
  handleOnEmail,
  handleOnPassword,
  handleLoginWithEmail,
  handleCreateUser,
  handlePasswordReset,
  handleLoginWithFacebook,
  handleLoginWithGoogle,
}: LoginFormProps) {
  const [newUser, setNewUser] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isAnEmailError =
    errorCode === "auth/user-not-found" ||
    errorCode === "auth/invalid-email" ||
    errorCode === "auth/email-already-in-use";

  const isAnPasswordError =
    errorCode === "auth/weak-password" || errorCode === "auth/wrong-password";

  useEffect(() => {
    switch (errorCode) {
      case "auth/user-not-found":
        setErrorMessage("User not found!");
        break;
      case "auth/invalid-email":
        setErrorMessage("Invalid email");
        break;
      case "auth/email-already-in-use":
        setErrorMessage("Email already in use!");
        break;
      case "auth/wrong-password":
        setErrorMessage("Wrong password!");
        break;
      case "auth/weak-password":
        setErrorMessage("Password should be at least 6 characters!");
        break;
      default:
        setErrorMessage("An error occurred!");
    }
  }, [errorCode]);

  const handleUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setNewUser(!newUser);
    setForgotPassword(false);
  };

  return (
    <form className={styles.form} autoComplete="off">
      {forgotPassword 
        && sendPasswordReset 
        && <p className={styles.resetPasswordText}>We have e-mailed your password reset link</p>}
      <Input
        id={"email"}
        type={"email"}
        name={"Email"}
        onFocus={() => setErrorMessage("")}
        onFieldChange={handleOnEmail}
        error={isAnEmailError}
        errorMessage={errorMessage}
      >
        <EmailIcon />
      </Input>
      {(newUser || !forgotPassword) && (
        <Input
          id={"password"}
          type={"password"}
          name={"Password"}
          onFocus={() => setErrorMessage("")}
          onFieldChange={handleOnPassword}
          error={isAnPasswordError}
          errorMessage={errorMessage}
        >
          <LockIcon />
        </Input>
      )}
      {!newUser && !forgotPassword && (
        <p
          className={styles.text}
          onClick={() => {
            setForgotPassword(!forgotPassword);
            setErrorMessage("");
          }}
        >
          Forgot Password
        </p>
      )}
      <div className={styles.wrapperSendButton}>
        <Button
          type={"submit"}
          onClick={
            !forgotPassword
              ? newUser
                ? handleCreateUser
                : handleLoginWithEmail
              : handlePasswordReset
          }
        >
          {newUser ? "Sign Up" : !forgotPassword ? "Sign In" : "Send Email"}
        </Button>
        {isSubmittingAuth && <LoaderForAuthProgress />}
      </div>
      <LoginWithProviders
        onClickFacebookLogin={handleLoginWithFacebook}
        onClickGoogleLogin={handleLoginWithGoogle}
      />
      <p className={styles.textFooter}>
        {newUser ? "If you have an account?" : "Didn’t have any account?"}
        <a href="#" onClick={handleUser}>
          {newUser ? "Sign In here" : "Sign Up here"}
        </a>
      </p>
    </form>
  );
}
