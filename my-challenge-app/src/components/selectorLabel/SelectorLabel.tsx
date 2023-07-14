import { useState } from 'react'

interface Label {
  id: string,
  name: string
  group: string
}

const SelectorLabel: React.FC<Label> = ({ id, name, group }) => {
  const [isSelected, setIsSelected] = useState('')

  const handleCheck = () => {
    setIsSelected(name)
  }

  return (
    <>
      <input 
        type='radio'
        id={id}
        name={group}
        value={isSelected}
        radioGroup ={group}
        onChange={handleCheck}
      />
      <label 
        htmlFor={id} 
      >
        {name}
      </label>
    </>
  )
}

export default SelectorLabel
