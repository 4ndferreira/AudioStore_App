//React
import { ReactNode, useState } from "react";
//Router
import { useLocation } from "react-router-dom";
//Framer-motion
import { MotionStyle, Variants, motion } from "framer-motion";

const transition = { duration: 0.2, type: "tween" };

export default function Page (props: { children: ReactNode }) {
  const location = useLocation();
  const [ isInView, setIsInView ] = useState(true)
  
  const isPush: boolean = location.state?.isPush ?? false;
  
  const container: MotionStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
    backgroundColor: "white"
  };

  const variants: Variants = {
    initial() {
      isPush && setIsInView(false)
      return {
        //Se isPush for verdadeiro, a posição inicial da página ao fundo é de -50% se deslocando a direita se tornando x=100% especificado na função da saida
        // Se isPush for falso, a posição inicial da página de topo ocupa a tela com 100% se deslocando para a esquerda até a posição 0 especificado na função de entrada
        x: isPush ? "-50%" : "100%"
      }
    },
    enter() {
      return {
        //x = 0 is the original position of the current page in the animation
        x: 0,
        position: "fixed",
        zIndex: isPush ? 0 : 2,
        //cria a sombra durante a transição de página da esquerda para direita
        boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.2)",
        // remove a sombra após o fim da transição
        transitionEnd: {
          height: "auto",
          position: "absolute",
          boxShadow: "none"
        }
      }
    },
    exit() {
      !isPush && setIsInView(false)
      return {
        //if isPush is true, slide 100% to the right; otherwise, slide 50% to the left
        x: isPush ? "100%" : "-50%",
        zIndex: isPush ? 2 : 0,
        //cria a sombra durante a transição de página da direita para esquerda
        boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.2)",
        transitionEnd: {
          height: "auto", 
        },
      }
    }
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        transition={transition}
        variants={variants}
        style={container}
        onAnimationComplete={() => { setIsInView(true) }}
      >
        {!isInView &&
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.1)",
              zIndex: 1
            }} />}
        {props.children}
      </motion.div>
    </>
  );
}