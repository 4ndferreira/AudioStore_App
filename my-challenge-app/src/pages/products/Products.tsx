//Hook
import { ChangeEvent, useState } from 'react'
import { Data, useFetch } from '../../hooks/useFetch'
//Components
import Button from '../../components/button/Button'
import NavBar from '../../components/navBar/NavBar'
import IconSliders from '../../components/button/IconSliders'
import Card from '../../components/card/Card'
import Categories from '../../components/categories/Categories'
import SortBy from '../../components/sortBy/SortBy'
import IconClose from '../../components/navBar/IconClose'
import { BottomSheet } from 'react-spring-bottom-sheet-updated'
import Loader from '../../components/loader/Loader'
//CSS
import classes from './Products.module.css'
import './style.css'

const Products = () => {
  const { data, loading } = useFetch('https://run.mocky.io/v3/534d1f3e-406e-4564-a506-7e2718fdb0bc');
  
  const [open, setOpen] = useState(false) 
  const [ filterCategory, setFilterCategory] = useState ('')
  const [ selectSortBy, setSelectSortBy] = useState ('')
  const [ sortedData, setSortedData] = useState<Data[] | undefined> (undefined)
  
  const openFilter = () => {
    setOpen(!open)
  }

  const handleCloseFilter = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setOpen(false)
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

  
  const handleSortBy = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const filteredData = data?.filter((item) => 
      item.category.includes(filterCategory)
    );
    
    selectSortBy === 'Popularity' &&
    filteredData?.sort((a, b) => b.reviews.length - a.reviews.length);

    selectSortBy === 'Newest' &&
    filteredData?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    selectSortBy === 'Oldest' &&
    filteredData?.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

    selectSortBy === 'High Price' &&
    filteredData?.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
      );

    selectSortBy === 'Low Price' &&
    filteredData?.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
      );

    selectSortBy === 'Review' && filteredData?.sort((a, b) => b.rating - a.rating);
    
    setSortedData(filteredData)
    setOpen(!open)
  }

  if (loading) {
    return <Loader />;
  }


  return (
    <>
      <div className={classes.gridTop}>
        <NavBar 
          link="/"
          link2="/cart"
          title={""}
          isShoppingCart={false} 
          onClick={undefined}      
        />
        <h2 className={classes.title}>
          <p className={classes.titleSmall}>Featured products</p>
          <p className={classes.titleBig}>See all Products</p>
        </h2>
      </div>
      <div className={classes.wrapper}>
        <Button type="button" name={<IconSliders />} onClick={openFilter} />
      </div>
      <section className={classes.showcase}>
        <div className={classes.itemsContainer}>
          {sortedData
            ? sortedData.map((item) => (
                <Card
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  showReview={true}
                />
              ))
            : data &&
              data.map((item) => (
                <Card
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  showReview={true}
                />
              ))}
        </div>
      </section>
      <BottomSheet open={open}>
        <form className={classes.filterContainer}>
          <div className={classes.filterTitle}>
            <h2>Filter</h2>
            <button
              className={classes.closeButton}
              onClick={handleCloseFilter}
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
            type={"submit"}
            onClick={handleSortBy}
            name={"Apply Filter"}
          />
        </form>
      </BottomSheet>
    </>
  );
}

export default Products
