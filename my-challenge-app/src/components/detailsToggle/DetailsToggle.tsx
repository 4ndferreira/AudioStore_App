import SelectorLabel from '../selectorLabel/SelectorLabel'
import classes from './DetailsToggle.module.css'

const DetailsToggle = () => {
  return (
    <div className={classes.container}>
      <SelectorLabel 
        id={'overview'} 
        name={'Overview'} 
        group={'details'} 
      />
      <SelectorLabel 
        id={'features'} 
        name={'Features'} 
        group={'details'} 
      />
    </div>
  );
}

export default DetailsToggle