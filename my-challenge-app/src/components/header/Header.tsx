//Hooks
import { MouseEventHandler, useState } from "react"
//Components
import IconUser from "../review/IconUser"
import IconLogo from "./IconLogo"
import IconMenu from "./IconMenu"
import IconLogout from "./IconLogout"
//CSS
import classes from "./Header.module.css"

const Header = (props: {
  image: string | null | undefined 
  onClick: MouseEventHandler<HTMLDivElement> | undefined 
}) => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <header className={classes.wrapper}>
      <div className={classes.container}>
        <div onClick={() => setShowLogout(!showLogout)}>
          <IconMenu />
        </div>
        <div className={classes.logo}>
          <IconLogo />
          <h2>Audio</h2>
        </div>
        <div
          className={classes.userImg}
          
        >
          {props.image 
          ? <img src={props.image} alt="" /> 
          : <IconUser />}
        </div>
      </div>
      {showLogout && (
        <div className={classes.menuLogout} onClick={props.onClick}>
          <IconLogout />
          <p>Logout</p> 
        </div>
      )}
    </header>
  );
};

export default Header;