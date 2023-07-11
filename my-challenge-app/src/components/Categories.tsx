
import { Splide, SplideSlide } from '../../node_modules/@splidejs/react-splide'
import '../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'
import CategoryLabel from './CategoryLabel '
import classes from './Categories.module.css'

const Categories = () => {
  
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
            <CategoryLabel 
              id={label.id} 
              name={label.label}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default Categories
