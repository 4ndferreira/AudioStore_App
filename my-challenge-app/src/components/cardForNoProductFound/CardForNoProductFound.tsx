//Icon
import IconShoppingBag from "../icons/IconShoppingBag";
//CSS
import classes from "./CardForNoProductFound.module.css";

export default function CardForNoProductFound(props: { isBanner: boolean }) {
  return (
    <li className={props.isBanner ? classes.banner : classes.card}>
      {props.isBanner ? (
        <h2>Ops! No products found in this category.</h2>
      ) : (
        <p>Ops! No products found in this category.</p>
      )}
      <IconShoppingBag width={"96"} height={"96"} color={"#BABABA"} />
    </li>
  );
}