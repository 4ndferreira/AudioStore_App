import { ChangeEvent, useState } from 'react';
import LabelInput from '../labelInput/LabelInput';
import classes from './SeachBar.module.css'

const SearchBar = () => {
  const [value, setValue ] = useState ('')
  const [isActive, setIsActice] = useState(false)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if(newValue === ''){
      setIsActice(false)
    } else {
      setIsActice(true)
    }
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <input
          id='input' 
          className={classes.input}
          type="text" 
          value={value}
          onChange={handleOnChange}
        />
        {!isActive && <LabelInput htmlFor='input' />}
      </div>
    </>
      
  );
}

export default SearchBar
