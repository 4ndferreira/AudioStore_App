//Hooks
import { MouseEventHandler, useEffect, useRef, useState } from "react";
//Framer motion
import { AnimatePresence } from "framer-motion";
//Components
import IconUser from "../review/IconUser";
import IconLogo from "./IconLogo";
import IconMenu from "./IconMenu";
import IconClose from "../navBar/IconClose";
import SideBar from "../sidebar/SideBar";
//CSS
import classes from "./Header.module.css";

const Header = (props: {
  image: string | null | undefined;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    showMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showMenu]);

  useEffect(()=>{
    const closeMenuHandler = (e: MouseEvent) => {
      if (menuRef.current?.contains(e.target as Node)) {
        setShowMenu(false)
      }
    };

    document.addEventListener("click", closeMenuHandler);

    return () => {
      document.removeEventListener("click", closeMenuHandler);
    }
  },[showMenu]);

  return (
    <header className={classes.wrapper}>
      <div className={classes.container}>
        <div
          className={classes.iconMenu}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <IconClose color={"black"} /> : <IconMenu />}
        </div>
        <div className={classes.logo}>
          <IconLogo />
          <h2>Audio</h2>
        </div>
        <div className={classes.userImg}>
          {props.image ? <img src={props.image} alt="" /> : <IconUser />}
        </div>
      </div>
      <AnimatePresence>
        {showMenu && <SideBar onClick={props.onClick} menuRef={menuRef}/> }
      </AnimatePresence>
    </header>
  );
};

export default Header;