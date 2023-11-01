//React Hooks
import { useEffect, useState } from "react";
// React Router
import { useNavigate } from "react-router-dom";
//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/Config";
//Components
import Login from "../login/Login";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
//Icons
import IconLogo from "../../components/icons/IconLogo";
//CSS
import classes from "./Welcome.module.css";

export default function Welcome() {
  const [ isOpen, setIsOpen ] = useState(false)
  const navigate = useNavigate()
  
  const handleModal = () => {
    setIsOpen(true)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => user && navigate("/"));
    return () => unsubscribe();
  }, [navigate]);
  return (
    <div className={classes.container}>
      <div className={classes.wrapperLogo}>
        <IconLogo dimension={"48"} />
      </div>
      <div className={classes.wrapperButton}>
        <Button type={"submit"} onClick={handleModal}>
          Login
        </Button>
      </div>
      <div className={classes.wrapperText}>
        <h1 className={classes.title}>Audio</h1>
        <h2 className={classes.subtitle}>It's modular and designed to last</h2>
      </div>
      <div className={classes.background} />
      <div className={classes.videoContainer}>
        <video className={classes.video} autoPlay loop muted preload="auto">
          <source src="/video/welcome.webm" type="video/webm" />
          <source src="/video/welcome.mp4" type="video/mp4" />
          <source src="/video/welcome.ogv" type="video/ogv" />
        </video>
      </div>
      {isOpen && 
        <div className={classes.wrapperModal}>
          <Modal 
            onClose={() => setIsOpen(false)} 
            isOpen={isOpen}
          >
            <Login />
          </Modal>
        </div>}
    </div>
  );
}
