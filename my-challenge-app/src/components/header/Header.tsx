//Hooks
import { MouseEventHandler, useEffect, useRef, useState } from "react";
//Components
import IconUser from "../review/IconUser";
import IconLogo from "./IconLogo";
import IconMenu from "./IconMenu";
//CSS
import classes from "./Header.module.css";
import SideBar from "../sidebar/SideBar";
import IconClose from "../navBar/IconClose";

const Header = (props: {
  image: string | null | undefined;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    showMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [showMenu]);

  useEffect(()=>{
    const closeSidebarHandler = (e: MouseEvent) => {
      if (showMenu && menuRef.current && menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    };

    document.addEventListener("click", closeSidebarHandler);

    return () => {
      document.removeEventListener("click", closeSidebarHandler);
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
      {showMenu && <SideBar onClick={props.onClick} menuRef={menuRef} />}
    </header>
  );
};

export default Header;
