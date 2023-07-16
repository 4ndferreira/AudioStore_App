
import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { Splide, SplideSlide } from '../../../node_modules/@splidejs/react-splide'
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'
import SelectorLabel from '../selectorLabel/SelectorLabel'
import classes from './Categories.module.css'

const Categories = (props: { 
  filterSelected: string; 
  onChange: ChangeEventHandler<HTMLInputElement> 
}) => {
  // const [ filterSelected, setFilterSelected] = useState ('')

  // const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target
  //   setFilterSelected(value)
  // }

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
    <div className={classes.wrapper}>
      <Splide 
        options={{
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
    </div>
  )
}

export default Categories
