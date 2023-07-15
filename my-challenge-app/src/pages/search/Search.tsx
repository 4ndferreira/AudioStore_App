import { ChangeEvent, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import Review from "../../components/review/Review";
import SearchItem from "../../components/searchItem/SearchItem"
import SortBy from "../../components/sortBy/SortBy";
import Input from "../../components/input/Input";
import SearchIcon from "../../components/labelInput/SearchIcon";
import Counter from "../../components/counter/Counter";
import classes from "./Search.module.css"

const Search = () => {
  const [value, setValue ] = useState ('')

  const handleOnInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
  };
  return (
    <div>
      <NavBar />
      <div className={classes.wrapper}>
        <Input 
          id={'searchBar'} 
          type={'text'}      
          name={'Search headphone'}
          element={<SearchIcon />}
          value={value}
          onInput={handleOnInput} 
        />
      </div>
      <SearchItem />
      <SortBy />
      <Review />
      <Counter />
    </div>
  );
}

export default Search
