import { ChangeEvent, useState } from "react"
import Categories from "../../components/categories/Categories"
import Input from "../../components/input/Input"
import SearchIcon from "../../components/labelInput/SearchIcon"

import classes from './Home.module.css'

const Home = () => {
  const [value, setValue ] = useState ('')

  const handleOnInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <>
      <h3 className={classes.welcomeText}>
        <small className={classes.welcomeTextSmall}>
          Hi, User
        </small>
        What are you looking for today?
      </h3>
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
      <div className={classes.showcase}>
        <Categories/>
        <div>
          <h4>Featured Products</h4>
          <a href="">See All</a>
        </div>
      </div>
    </>
  )
}

export default Home
