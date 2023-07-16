import { ChangeEventHandler } from 'react'

interface Label {
  id: string,
  name: string
  group: string
}

const SelectorLabel = (props: {
  id: string; 
  checked: boolean;
  name: string; 
  group: string; 
  onChange: ChangeEventHandler<HTMLInputElement>; 
}) => {

  return (
    <>
      <input 
        type='radio'
        id={props.id}
        name={props.group}
        value={props.name}
        checked={props.checked}
        radioGroup ={props.group}
        onChange={props.onChange}
      />
      <label 
        htmlFor={props.id} 
      >
        {props.name}
      </label>
    </>
  )
}

export default SelectorLabel
