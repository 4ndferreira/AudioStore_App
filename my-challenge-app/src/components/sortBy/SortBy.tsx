import SelectorLabel from '../selectorLabel/SelectorLabel'
import classes from './SortBy.module.css'

const SortBy = () => {
  return (
    <div className={classes.container}>
      <SelectorLabel 
        id={'popularity'} 
        name={'Popularity'} 
        group={'sortby'} 
      />
      <SelectorLabel 
        id={'newest'} 
        name={'Newest'} 
        group={'sortby'} 
      />
      <SelectorLabel 
        id={'oldest'} 
        name={'Oldest'} 
        group={'sortby'} 
      />
      <SelectorLabel 
        id={'highPrice'} 
        name={'High Price'} 
        group={'sortby'} 
      />
      <SelectorLabel 
        id={'lowPrice'} 
        name={'Low Price'} 
        group={'sortby'} 
      />
      <SelectorLabel 
        id={'review'} 
        name={'Review'} 
        group={'sortby'} 
      />
    </div>
  );
}

export default SortBy
