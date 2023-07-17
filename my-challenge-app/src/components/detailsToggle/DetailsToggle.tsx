import { ChangeEventHandler } from 'react';
import SelectorLabel from '../selectorLabel/SelectorLabel'
import classes from './DetailsToggle.module.css'

const DetailsToggle = (props: { 
  selected: string; 
  onChange: ChangeEventHandler<HTMLInputElement> 
}) => {
  return (
    <div className={classes.container}>
      <SelectorLabel 
        id={'overview'}
        name={'Overview'}
        group={'details'} 
        checked={props.selected === 'Overview'} 
        onChange={props.onChange}      
      />
      <SelectorLabel 
        id={'features'}
        name={'Features'}
        group={'details'} 
        checked={props.selected === 'Features'} 
        onChange={props.onChange}      
      />
    </div>
  );
}

export default DetailsToggle