import { useState } from 'react'
import classes from './CategoryLabe.module.css'

interface Label {
  id: string,
  name: string
}

const CategoryLabel: React.FC<Label> = ({ id, name }) => {
  const [isSelected, setIsSelected] = useState('')

  const handleCheck = () => {
    setIsSelected(name)
  }

  return (
    <>
      <input 
        type='radio'
        id={id}
        name='category'
        value={isSelected}
        radioGroup ='category'
        className={classes.radioInput}
        onChange={handleCheck}
      />
      <label 
        htmlFor={id} 
        className={classes.radioLabel}
      >
        {name}
      </label>
    </>
  )
}

export default CategoryLabel
