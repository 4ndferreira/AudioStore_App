//Components
import LoginForm from "../../components/loginForm/LoginForm";
//Hook
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAuth } from "../../hooks/useAuth";
//CSS
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const auth = useAuth();
  const isDesktop = useMediaQuery();

  return (
    <div className={classes.container}>
      {!isDesktop && (
        <>
          <picture className={classes.picture}>
            <source type="image/webp" srcSet="/img/image10.webp" />
            <source type="image/png" srcSet="/img/image10.png" />
            <img src="/img/image10.png" alt="" />
          </picture>
          <h1 className={classes.titleWrapper}>
            Audio
            <small>It's modular and designed to last</small>
          </h1>
        </>
      )}
      <LoginForm
        submitted={auth.submitted}
        errorCode={auth.errorCode}
        isSubmittingAuth={auth.submittingAuth}
        handleOnEmail={auth.handleOnEmail}
        handleOnPassword={auth.handleOnPassword}
        handleLoginWithEmail={auth.handleLoginWithEmail}
        handleCreateUser={auth.handleCreateUser}
        handlePasswordReset={auth.handlePasswordReset}
        handleLoginWithFacebook={auth.handleLoginWithFacebook}
        handleLoginWithGoogle={auth.handleLoginWithGoogle}
      />
    </div>
  );
}
