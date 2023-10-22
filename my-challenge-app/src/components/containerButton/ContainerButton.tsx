import { ReactNode } from "react";
import ReactDOM from "react-dom";

export default function ContainerButton(props: { children: ReactNode }) {
  const Root = document.getElementById("root");
  if (Root) return ReactDOM.createPortal(props.children, Root);
}