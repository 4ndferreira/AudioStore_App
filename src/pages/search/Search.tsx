//React
import { useState } from "react";
//Hook
import { useFetch } from "../../hooks/useFetch";
//Components
import HeaderMobileWhileBrowsing from "../../components/headerMobileWhileBrowsing/HeaderMobileWhileBrowsing";
import CardForCartItemsOrSearchItems from "../../components/cardForCartItemsOrSearchItems/CardForCartItemsOrSearchItems";
import CardSkeletonForCartItemsOrSearchItems from "../../components/cardSkeletonForCartItemsOrSearchItems/cardSkeletonForCartItemsOrSearchItems";
import Input from "../../components/input/Input";
//Icons
import SearchIcon from "../../components/icons/SearchIcon";
import IconShoppingBag from "../../components/icons/IconShoppingBag";
//CSS
import classes from "./Search.module.css";

export default function Search() {
  const [value, setValue] = useState("");
  const { data, loading } = useFetch();

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  const handleOnSearch = (newValue: string) => setValue(newValue);

  return (
    <>
      <HeaderMobileWhileBrowsing />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Input
            id={"searchBar"}
            type={"text"}
            name={"Search headphone"}
            onFocus={undefined}
            onFieldChange={handleOnSearch}
          >
            <SearchIcon size={"20"} color={"#BABABA"} />
          </Input>
        </div>
        {value ? (
          <ul className={classes.listItems}>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => (
                <CardForCartItemsOrSearchItems
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  category={item.category}
                  itemId={item.id}
                  count={0}
                  showModal={() => null}
                  onItemDelete={() => null}
                />
              ))
            ) : (
              <div className={classes.textAlert}>
                <IconShoppingBag width={"72"} height={"72"} color={"#BABABA"} />
                <p className={classes.text}>Sorry, No Products Found</p>
              </div>
            )}
          </ul>
        ) : (
          <>
            <h2 className={classes.text}>Popular Product</h2>
            <ul className={classes.listItems}>
              {!data || loading ? (
                <div className={classes.containerSkeleton}>
                  <CardSkeletonForCartItemsOrSearchItems cards={4} />
                </div>
              ) : (
                filteredData
                  ?.sort((a, b) => b.reviews.length - a.reviews.length)
                  .map(
                    (item, index) =>
                      index < 5 && (
                        <CardForCartItemsOrSearchItems
                          key={item.id}
                          name={item.name}
                          price={item.price}
                          rating={item.rating}
                          category={item.category}
                          itemId={item.id}
                          count={0}
                          showModal={() => null}
                          onItemDelete={() => null}
                        />
                      )
                  )
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
