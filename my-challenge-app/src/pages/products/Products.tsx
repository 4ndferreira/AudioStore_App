import { useState } from "react"
import Button from "../../components/button/Button"
import classes from "./Products.module.css"
import NavBar from "../../components/navBar/NavBar"
import IconSliders from "../../components/button/IconSliders"

const Products = () => {
  const [isActive, setIsActive] = useState(false)
  const activeFilter = () => {
    setIsActive(!isActive)
  }
  
  return (
    <>
      <NavBar />
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
          onClick={activeFilter} 
        />
      </div>
    </>
  );
}

export default Products
