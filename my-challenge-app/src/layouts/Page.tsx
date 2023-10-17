import { Variants, motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const transition = { duration: 0.6, ease: 'easeInOut' };

const Page = (props: { children: ReactNode }) => {
  const location = useLocation();
  const isPush: boolean = location.state && location.state.isPush;

  const variants: Variants = {
    initial: {
      x: isPush ? "-50%" : "100%",
      backgroundColor: "white",
      height: "100vh",
      boxShadow: "0 0 0 rgba(0,0,0,0)"
    },
    animate: {
      x: 0,
      transitionEnd: {
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      },
      position: "absolute",
      backgroundColor: "white",
      zIndex: isPush ? "0" : "1",
      width: "100vw",
      height: "100vh",
      boxShadow: isPush
        ? "0 0 0 rgba(0,0,0,0)"
        : "0 25px 50px rgba(0,0,0,0.5), -100vw 0 0 rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
    },
    exit: {
      x: isPush ? "-75%" : "100%",
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      variants={variants}
    >
      {props.children}
    </motion.div>
  );
};

export default Page;