import { ChangeEventHandler } from 'react'

export default function SelectorLabel (props: {
  id: string; 
  checked: boolean;
  name: string; 
  group: string; 
  onChange: ChangeEventHandler<HTMLInputElement>; 
}) {
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