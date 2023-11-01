//Type
import { ChangeEventHandler } from 'react';
//Component
import SelectorLabel from '../selectorLabel/SelectorLabel'
//CSS
import classes from './SortBy.module.css'

export default function SortBy(props: {
  filterSelected: string; 
  onChange: ChangeEventHandler<HTMLInputElement>; 
}) {
  const labels = ['Popularity', 'Newest', 'Newest', 'High Price', 'Low Price', 'Review']
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
        name={'Newest'}
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