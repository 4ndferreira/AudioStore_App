
//React
import { ChangeEventHandler } from 'react'
//Splide
import { Splide, SplideSlide } from '../../../node_modules/@splidejs/react-splide'
//Components
import SelectorLabel from '../selectorLabel/SelectorLabel'
//CSS
import classes from './Categories.module.css'
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'

const Categories = (props: { 
  filterSelected: string; 
  onChange: ChangeEventHandler<HTMLInputElement> 
}) => {
  const categories = [
    { 
      id: 'headphone', 
      label: 'Headphone' 
    }, 
    { 
      id: 'headband', 
      label: 'Headband' 
    }, 
    { 
      id: 'earpads', 
      label: 'Earpads' 
    }, 
    { 
      id: 'cable', 
      label: 'Cable' 
    }, 
    { 
      id: 'headset', 
      label: 'Headset' 
    },
  ]


  return (
    <>
      <Splide 
        options={{
          width: '100%',
          autoWidth: true,
          arrows: false, 
          pagination: false,
          gap: '0.69rem',
        }}>
        {categories.map((label) => (   
          <SplideSlide key={label.id}>
            <div className={classes.card}>
              <SelectorLabel 
                id={label.id}
                name={label.label}
                group={'category'} 
                checked={props.filterSelected === label.label} 
                onChange={props.onChange}              
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </>
  )
}

export default Categories
