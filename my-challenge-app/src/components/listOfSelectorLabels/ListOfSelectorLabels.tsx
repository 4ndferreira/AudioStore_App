//React
import { ChangeEventHandler } from "react";
//Components
import SelectorLabel from "../selectorLabel/SelectorLabel";
//CSS
import classes from "./Categories.module.css";

export default function Categories(props: {
  filterSelected: string;
  group: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const filterByCategory = props.group === "category";
  const labels =
  filterByCategory
      ? ["Headphone", "Headband", "Earpads", "Cable", "Headset"]
      : ["Popularity", "Newest", "Oldest", "High Price", "Low Price", "Review"];

  return (
    <ul className={filterByCategory ? classes.scrollMenu : classes.sortby}>
      {labels.map((label, index) => (
        <li className={props.group ? classes.category : undefined} key={index}>
          <SelectorLabel
            id={label.toLowerCase().replace(" ", "-")}
            name={label}
            group={props.group}
            checked={props.filterSelected === label}
            onChange={props.onChange}
          />
        </li>
      ))}
    </ul>
  );
}