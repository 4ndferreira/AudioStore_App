//Hook
import { ChangeEvent, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
//Components
import Button from '../../components/button/Button'
import NavBar from '../../components/navBar/NavBar'
import IconSliders from '../../components/button/IconSliders'
import Card from '../../components/card/Card'
import Categories from '../../components/categories/Categories'
import SortBy from '../../components/sortBy/SortBy'
import IconClose from '../../components/navBar/IconClose'
import { BottomSheet } from 'react-spring-bottom-sheet-updated'

//CSS
import classes from './Products.module.css'
import '../../../node_modules/react-spring-bottom-sheet-updated/dist/style.css'

const Products = () => {
  const { data, loading, error } = useFetch('https://run.mocky.io/v3/534d1f3e-406e-4564-a506-7e2718fdb0bc');
  
  const [open, setOpen] = useState(false) 
  const [ filterCategory, setFilterCategory] = useState ('')
  const [ selectSortBy, setSelectSortBy] = useState ('')

  const openFilter = () => {
    setOpen(true)
  }

  const handleSelectCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFilterCategory(value)
  }
  console.log(filterCategory)

  const handleSelectSortBy = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSelectSortBy(value)
  }
  console.log(selectSortBy)

  const filteredData = data?.filter((item) => 
    item.category.includes(filterCategory)
  );

  const handleFilters = () => {
    selectSortBy === 'Review' && data?.sort((a,b)=>b.rating - a.rating)
    console.log(data)
  } 
  
  return (
    <>
      <NavBar 
        link='/'
        link2='/card' 
        title={''}      
      />
      <h2 className={classes.title}>
        <p className={classes.titleSmall}>
          Featured products
        </p>
        <p className={classes.titleBig}>
          See all Products
        </p>
      </h2>
      <div className={classes.wrapper}>
        <Button 
          type="button" 
          name={<IconSliders />} 
          onClick={openFilter} 
        />
      </div>
      <section className={classes.showcase}>
        {filteredData && filteredData.map((item) => (
          <Card 
            key={item.id}
            name={item.name}
            price={item.price}
            rating={item.rating}
            showReview={true} 
          />
        ))} 
      </section>
      <BottomSheet open={open}>
        <div className={classes.filterContainer}>
          <div className={classes.filterTitle}>
            <h2>Filter</h2>
            <button className={classes.closeButton}
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </button>
          </div>
          <div>
            <h4>Category</h4>
            <Categories 
              filterSelected={filterCategory} 
              onChange={handleSelectCategory} 
            />
          </div>
          <div>
            <h4>Sort By</h4>
            <SortBy 
              filterSelected={selectSortBy} 
              onChange={handleSelectSortBy} 
            />
          </div>
          <Button 
            type={'button'} 
            onClick={handleFilters} 
            name={'Apply Filter'} 
          />
        </div>
      </BottomSheet>
    </>
  );
}

export default Products
