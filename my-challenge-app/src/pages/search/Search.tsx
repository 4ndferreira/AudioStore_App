import { ChangeEvent, useState } from "react";
//Hook
import { useFetch } from "../../hooks/useFetch";
//Components
import NavBar from "../../components/navBar/NavBar";
import SearchItem from "../../components/searchItem/SearchItem"
import Input from "../../components/input/Input";
import SearchIcon from "../../components/labelInput/SearchIcon";
import IconShoppingBag from "../../components/iconShoppingBag/IconShoppingBag";
//CSS
import classes from "./Search.module.css"

const Search = () => {
  const [value, setValue ] = useState ('')
  const { data } = useFetch('https://run.mocky.io/v3/534d1f3e-406e-4564-a506-7e2718fdb0bc');

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
      <div className={classes.headerContainer}>
        <NavBar 
          link='/'
          link2='/cart '
          title={'Search'}
          isShoppingCart={false} 
          onClick={undefined}      
        />
        <div className={classes.wrapper}>
          <Input
            id={"searchBar"}
            type={"text"}
            name={"Search headphone"}
            element={<SearchIcon />}
            value={value}
            onInput={handleOnInput}
          />
        </div>
        {value && (
          <ul className={classes.listItems}>
            {filteredData && 
            filteredData.length > 0 ? (
              filteredData.map((item) => (
                <SearchItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  isShoppingCart={false} 
                  itemId={item.id} 
                  count={0}              
                />
              ))
            ) : (
              <div className={classes.textAlert}>
                <IconShoppingBag 
                  width={"72"} 
                  height={"72"} 
                  color={"#BABABA"}
                />
                <p className={classes.text}>
                  Sorry, No Products Found
                </p>
              </div>
            )}
          </ul>
        )}
      </div>
      <div className={classes.bodyContainer}>
        <h2 className={classes.text}>Popular Product</h2>
        <ul className={classes.listItems}>
          <SearchItem
            name={"TMA-2 Comfort Wireless"}
            price={"USD 270"}
            rating={4.6}
            isShoppingCart={false} 
            itemId={999} 
            count={0}        
          />
          <SearchItem
            name={"TMA-2 DJ"}
            price={"USD 270"}
            rating={4.6}
            isShoppingCart={false} 
            itemId={999} 
            count={0}        
          />
          <SearchItem
            name={"TMA-2 Move Wireless"}
            price={"USD 270"}
            rating={4.6}
            isShoppingCart={false} 
            itemId={999} 
            count={0}        
          />
        </ul>
      </div>
    </>
  );
}

export default Search
