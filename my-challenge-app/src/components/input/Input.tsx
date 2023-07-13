import { ChangeEvent, FormEventHandler, useState } from 'react';
import LabelInput from '../labelInput/LabelInput';
import classes from './Input.module.css'

const Input = (props: {
  id: string
  type: string;
  element: JSX.Element; 
  name: string; 
  value: string
  onInput: FormEventHandler<HTMLInputElement> | undefined;
}) => {
  const [isActive, setIsActice] = useState(false)

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    if(newValue === ''){
      setIsActice(false)
    } else {
      setIsActice(true)
    }
  };

  return (
    <>
      <input
        className={classes.input}
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={handleOnChange}
        onInput={props.onInput}
      />
      {!isActive && (
        <LabelInput
          htmlFor={props.id}
          element={props.element}
          name={props.name}
        />
      )}
    </>
  );
}

export default Input
