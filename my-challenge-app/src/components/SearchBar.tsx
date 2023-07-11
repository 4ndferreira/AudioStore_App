import classes from './SeachBar.module.css'
import LabelInput from './LabelInput';
import { useState } from 'react';

const SearchBar = () => {
  const [isActive, setIsActice] = useState(false)
  return (
    <>
      <div className={classes.wrapper}>
        <input
          id='input' 
          className={classes.input}
          type="text" 
          onFocus={() =>setIsActice(true)}
          onBlur={() =>setIsActice(false)}
        />
        {!isActive && <LabelInput htmlFor='input' />}
      </div>
    </>
      
  );
}

export default SearchBar
