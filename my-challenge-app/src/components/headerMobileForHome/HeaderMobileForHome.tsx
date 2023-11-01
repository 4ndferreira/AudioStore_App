//Hooks
import { MouseEventHandler, useEffect, useRef, useState } from "react";
//Framer motion
import { AnimatePresence } from "framer-motion";
//Components
import SideBar from "../sidebar/SideBar";
//Icons
import IconUser from "../icons/IconUser";
import IconLogo from "../icons/IconLogo";
import IconMenu from "../icons/IconMenu";
import IconClose from "../icons/IconClose";
//CSS
import classes from "./HeaderMobileForHome.module.css";

export default function HeaderMobileForHome(props: {
  image: string | null | undefined;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
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
    <>
      <header className={classes.wrapper}>
        <h2 className={classes.logo}>
          <IconLogo dimension={"22"} />
          <span>Audio</span>
        </h2>
        <nav className={classes.container}>
          <button
            className={classes.buttonBurgerMenu}
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <IconClose color={"black"} /> : <IconMenu />}
          </button>
          <button className={classes.buttonUser}>
            {props.image ? <img src={props.image} alt="" /> : <IconUser />}
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {showMenu && (
          <SideBar
            logout={props.onClick}
            closeSidebar={() => setShowMenu(false)}
            menuRef={menuRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}