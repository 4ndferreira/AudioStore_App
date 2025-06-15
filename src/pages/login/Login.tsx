//Components
import VideoBackground from "../../components/videoBackground/VideoBackground";
import ImageBackground from "../../components/imageBackground/ImageBackground";
import IconLogo from "../../components/icons/IconLogo";
import ShowLoginForm from "../../components/showLoginForm/ShowLoginForm";
import LoginForm from "../../components/loginForm/LoginForm";
import Title from "../../components/title/Title";
//Hook
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAuth } from "../../hooks/useAuth";
//CSS
import classes from "./Login.module.css";

export default function Login() {
  const auth = useAuth();
  const isDesktop = useMediaQuery();

  return (
    <div className={classes.container}>
      {isDesktop ? (
        <>
          <VideoBackground />
          <div className={classes.wrapperLogo}>
            <IconLogo dimension={"48"} />
          </div>
        </>
      ) : (
        <ImageBackground />
      )}
      <Title />
      <ShowLoginForm isDesktop={isDesktop}>
        <LoginForm {...auth} />
      </ShowLoginForm>
    </div>
  );
}
