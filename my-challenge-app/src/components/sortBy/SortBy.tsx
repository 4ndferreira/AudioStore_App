import { ChangeEventHandler } from 'react';
import SelectorLabel from '../selectorLabel/SelectorLabel'
import classes from './SortBy.module.css'

const SortBy = (props: {
  filterSelected: string; 
  onChange: ChangeEventHandler<HTMLInputElement>; 
}) => {
  return (
    <div className={classes.container}>
      <SelectorLabel 
        id={'popularity'}
        name={'Popularity'}
        group={'sortby'} 
        checked={props.filterSelected === 'Popularity'} 
        onChange={props.onChange}      
      />
      <SelectorLabel 
        id={'newest'}
        name={'Newest'}
        group={'sortby'} 
        checked={props.filterSelected === 'Newest'} 
        onChange={props.onChange}      
      />
      <SelectorLabel 
        id={'oldest'}
        name={'Oldest'}
        group={'sortby'} 
        checked={props.filterSelected === 'Oldest'} 
        onChange={props.onChange}      
      />
      <SelectorLabel 
        id={'highPrice'}
        name={'High Price'}
        group={'sortby'} 
        checked={props.filterSelected === 'High Price'} 
        onChange={props.onChange}      
      />
      <SelectorLabel 
        id={'lowPrice'}
        name={'Low Price'}
        group={'sortby'} 
        checked={props.filterSelected === 'Low Price'} 
        onChange={props.onChange}      
      />
      <SelectorLabel 
        id={'review'}
        name={'Review'}
        group={'sortby'} 
        checked={props.filterSelected === 'Review'} 
        onChange={props.onChange}      
      />
    </div>
  );
}

export default SortBy
