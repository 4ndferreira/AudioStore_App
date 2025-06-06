//React
import { MouseEventHandler, ChangeEventHandler } from "react";
//Components
import Button from "../button/Button";
import Categories from "../listOfSelectorLabels/ListOfSelectorLabels";
//Icons
import IconClose from "../icons/IconClose";
//CSS
import classes from "./AllFilteringOptions.module.css";

export default function AllFilteringOptions(props: {
  handleCloseFilter: MouseEventHandler<HTMLButtonElement> | undefined;
  filterCategory: string;
  handleSelectCategory: ChangeEventHandler<HTMLInputElement>;
  selectSortBy: string;
  handleSelectSortBy: ChangeEventHandler<HTMLInputElement>;
  handleSortBy: MouseEventHandler<HTMLButtonElement>;
}) {
  const nameOfFilter = ["Category", "Sort By"];

  return (
    <form className={classes.filterContainer}>
      <div className={classes.filterTitle}>
        <h2>Filter</h2>
        <button
          className={classes.closeButton}
          onClick={props.handleCloseFilter}
        >
          <IconClose color={"black"} />
        </button>
      </div>
      {nameOfFilter.map((filter, index) => (
        <div key={index}>
          <h4>{filter}</h4>
          <Categories
            filterSelected={
              filter === "Category" ? props.filterCategory : props.selectSortBy
            }
            onChange={
              filter === "Category"
                ? props.handleSelectCategory
                : props.handleSelectSortBy
            }
            group={filter.toLowerCase().replace(" ", "-")}
          />
        </div>
      ))}
      <Button type={"submit"} onClick={props.handleSortBy}>
        Apply Filter
      </Button>
    </form>
  );
}