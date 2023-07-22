import { ChangeEvent, FormEventHandler } from 'react';
import classes from './Input.module.css'

const Input = (props: {
  id: string
  type: string;
  element: JSX.Element; 
  name: string; 
  value: string
  onInput: FormEventHandler<HTMLInputElement> | undefined;
}) => {
  //const [isActive, setIsActice] = useState(false)

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    // if(newValue === ''){
    //   setIsActice(false)
    // } else {
    //   setIsActice(true)
    // }
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
        placeholder={props.name}
      />
      <label 
        className={classes.label} 
        htmlFor={props.id}
      >
        {props.element}
      </label>
    </>
  );
}

export default Input
