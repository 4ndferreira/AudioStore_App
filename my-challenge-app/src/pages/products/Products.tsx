//React
import { ChangeEvent, useState } from "react";
//Hook
import { Data, useFetch } from "../../hooks/useFetch";
import { useMediaQuery } from "../../hooks/useMediaQuery";
//React Spring Bottom Sheet
import { BottomSheet } from "react-spring-bottom-sheet-updated";
//Components
import Button from "../../components/button/Button";
import HeaderMobileWhileBrowsing from "../../components/headerMobileWhileBrowsing/HeaderMobileWhileBrowsing";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import LoadingError from "../../components/loadingError/LoadingError";
//Icons
import IconSliders from "../../components/icons/IconSliders";
import IconShoppingBag from "../../components/icons/IconShoppingBag";
//CSS
import classes from "./Products.module.css";
import "./style.css";
import ShowAllCardsOfProducts from "../../components/showAllCardsOfProducts/ShowAllCardsOfProducts";
import PagesWithAllProducts from "../../components/pagesWithAllProducts/PagesWithAllProducts";
import AllFilteringOptions from "../../components/allFilteringOptions/AllFilteringOptions";
import Modal from "../../components/modal/Modal";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [selectSortBy, setSelectSortBy] = useState("");
  const [sortedData, setSortedData] = useState<Data[] | undefined>(undefined);

  const { data, loading, error } = useFetch();

  const isDesktop = useMediaQuery();

  const openFilter = () => {
    setOpen(!open);
  };

  const handleCloseFilter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleSelectCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterCategory(value);
  };

  const handleSelectSortBy = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectSortBy(value);
  };

  const handleSortBy = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const filteredData = data?.filter((item) =>
      item.category.includes(filterCategory)
    );

    selectSortBy === "Popularity" &&
      filteredData?.sort((a, b) => b.reviews.length - a.reviews.length);

    selectSortBy === "Newest" &&
      filteredData?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    selectSortBy === "Oldest" &&
      filteredData?.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

    selectSortBy === "High Price" &&
      filteredData?.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
      );

    selectSortBy === "Low Price" &&
      filteredData?.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
      );

    selectSortBy === "Review" &&
      filteredData?.sort((a, b) => b.rating - a.rating);

    setSortedData(filteredData);
    setOpen(!open);
  };

  return (
    <>
      {error ? (
        <LoadingError />
      ) : (
        <div className={classes.container}>
          {!isDesktop && <HeaderMobileWhileBrowsing/>}
          <section className={classes.wrapper}>
            <div className={classes.title}>
              <h3 className={classes.titleSmall}>Featured products</h3>
              <h2 className={classes.titleBig}>See all Products</h2>
            </div>
            <Button type="button" onClick={openFilter}>
              <IconSliders />
            </Button>
          </section>
          <section className={classes.showcase}>
            {isDesktop ? (
              !data || loading ? (
                <div className={classes.containerSkeleton}>
                  <CardSkeleton cards={10} />
                </div>
              ) : sortedData ? (
                <PagesWithAllProducts sortedData={sortedData} />
              ) : (
                <PagesWithAllProducts sortedData={data} />
              )
            ) : (
              <div className={classes.itemsContainer}>
                {!data || loading ? (
                  <CardSkeleton cards={6} />
                ) : sortedData ? (
                  sortedData.length !== 0 ? (
                    <ShowAllCardsOfProducts data={sortedData} />
                  ) : (
                    <li className={classes.noReturn}>
                      <IconShoppingBag
                        width={"96"}
                        height={"96"}
                        color={"#BABABA"}
                      />
                      <h2>
                        Ops!
                        <br /> No products found in this category.
                      </h2>
                    </li>
                  )
                ) : (
                  <ShowAllCardsOfProducts data={data} />
                )}
              </div>
            )}
          </section>
          {isDesktop ? (
            open && (
              <div className={classes.wrapperModal}>
                <Modal onClose={() => setOpen(false)} isOpen={open}>
                  <AllFilteringOptions
                    handleCloseFilter={handleCloseFilter}
                    filterCategory={filterCategory}
                    handleSelectCategory={handleSelectCategory}
                    selectSortBy={selectSortBy}
                    handleSelectSortBy={handleSelectSortBy}
                    handleSortBy={handleSortBy}
                  />
                </Modal>
              </div>
            )
          ) : (
            <BottomSheet open={open}>
              <AllFilteringOptions
                handleCloseFilter={handleCloseFilter}
                filterCategory={filterCategory}
                handleSelectCategory={handleSelectCategory}
                selectSortBy={selectSortBy}
                handleSelectSortBy={handleSelectSortBy}
                handleSortBy={handleSortBy}
              />
            </BottomSheet>
          )}
        </div>
      )}
    </>
  );
}
