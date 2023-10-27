//React
import { ChangeEvent, useState } from "react";
//Hook
import { useFetch } from "../../hooks/useFetch";
//Components
import NavBar from "../../components/navBar/NavBar";
import SearchItem from "../../components/searchItem/SearchItem"
import Input from "../../components/input/Input";
//Icons
import SearchIcon from "../../components/icons/SearchIcon";
import IconShoppingBag from "../../components/icons/IconShoppingBag";
//CSS
import classes from "./Search.module.css"

export default function Search() {
  const [value, setValue ] = useState ('')
  const { data } = useFetch();

  const filteredData = data?.filter((item) => 
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  const handleOnInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.container}>
        <NavBar 
          link="/home" 
          title={"Search"} 
          isShoppingCart={false} 
        />
        <div className={classes.wrapper}>
          <Input
            id={"searchBar"}
            type={"text"}
            name={"Search headphone"}
            element={<SearchIcon size={"20"} color={"#BABABA"} />}
            value={value}
            onInput={handleOnInput}
            onFocus={undefined}
          />
        </div>
        {value ? (
          <ul className={classes.listItems}>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => (
                <SearchItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  category={item.category}
                  isShoppingCart={false}
                  itemId={item.id}
                  count={0}
                  showModal={() => null}
                  onItemDelete={() => null}
                />
              ))
            ) : (
              <div className={classes.textAlert}>
                <IconShoppingBag 
                  width={"72"} 
                  height={"72"} 
                  color={"#BABABA"} 
                />
                <p className={classes.text}>Sorry, No Products Found</p>
              </div>
            )}
          </ul>
        ) : (
          <>
            <h2 className={classes.text}>Popular Product</h2>
            <ul className={classes.listItems}>
              {filteredData
                ?.sort((a, b) => b.reviews.length - a.reviews.length)
                .map(
                  (item, index) =>
                    index < 5 && (
                      <SearchItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        rating={item.rating}
                        category={item.category}
                        isShoppingCart={false}
                        itemId={item.id}
                        count={0}
                        showModal={() => null}
                        onItemDelete={() => null}
                      />
                    )
                )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}