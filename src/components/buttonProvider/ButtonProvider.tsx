import { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from "react";
import styles from "./ButtonProvider.module.css";

interface ButtonProviderProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: JSX.Element;
}

export default function ButtonProvider({
  children,
  ...props
}: ButtonProviderProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
