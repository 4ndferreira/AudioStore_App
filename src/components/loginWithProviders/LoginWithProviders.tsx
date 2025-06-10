import { MouseEventHandler } from "react";
import FacebookIcon from "../icons/FacebookIcon";
import GoogleIcon from "../icons/GoogleIcon";
import styles from "./LoginWithButtonProviders.module.scss";
import Button from "../button/Button";

interface LoginWithProvidersProps {
  onClickFacebookLogin: MouseEventHandler<HTMLButtonElement>;
  onClickGoogleLogin: MouseEventHandler<HTMLButtonElement>;
}

export default function LoginWithProviders({
  onClickFacebookLogin,
  onClickGoogleLogin,
}: LoginWithProvidersProps) {
  return (
    <div className={styles.wrapperButtons}>
      <Button
        type="button"
        title="Login with Facebook"
        className={styles.button}
        onClick={onClickFacebookLogin}
      >
        <FacebookIcon />
      </Button>
      <Button
        type="button"
        title="Login with Google"
        className={styles.button}
        onClick={onClickGoogleLogin}
      >
        <GoogleIcon />
      </Button>
    </div>
  );
}
