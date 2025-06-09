//React
import { MouseEventHandler, ChangeEventHandler } from "react";
//Components
import Button from "../button/Button";
import ListOfSelectorLabels from "../listOfSelectorLabels/ListOfSelectorLabels";
//Icons
import IconClose from "../icons/IconClose";
//CSS
import styles from "./AllFilteringOptions.module.scss";

export interface AllFilteringOptionsProps {
  filterCategory: string;
  selectSortBy: string;
  handleSortBy: MouseEventHandler<HTMLButtonElement>;
  handleCloseFilter: MouseEventHandler<HTMLButtonElement>;
  handleSelectCategory: ChangeEventHandler<HTMLInputElement>;
  handleSelectSortBy: ChangeEventHandler<HTMLInputElement>;
}

export default function AllFilteringOptions({
  filterCategory,
  selectSortBy,
  handleSortBy,
  handleCloseFilter,
  handleSelectCategory,
  handleSelectSortBy,
}: AllFilteringOptionsProps) {
  const nameOfFilter = ["Category", "Sort By"];

  return (
    <form className={styles.filterContainer}>
      <div className={styles.filterTitle}>
        <h2>Filter</h2>
        <button className={styles.closeButton} onClick={handleCloseFilter}>
          <IconClose color={"black"} />
        </button>
      </div>
      {nameOfFilter.map((filter, index) => (
        <div key={index}>
          <h4>{filter}</h4>
          <ListOfSelectorLabels
            filterSelected={
              filter === "Category" ? filterCategory : selectSortBy
            }
            onChange={
              filter === "Category" ? handleSelectCategory : handleSelectSortBy
            }
            group={filter.toLowerCase().replace(" ", "-")}
          />
        </div>
      ))}
      <Button type={"submit"} onClick={handleSortBy}>
        Apply Filter
      </Button>
    </form>
  );
}
