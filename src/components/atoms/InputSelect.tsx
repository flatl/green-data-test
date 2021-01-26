import React from 'react'

export interface Props {
  list: string[]
  currentValue: string
  defaultValue: string
  name: string
  label: string
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
}


const InputSelect = ({ list, currentValue, defaultValue, name, label, handleSelect }: Props) => {
  if (!currentValue)
    currentValue = defaultValue
  return (
    <div className="input input-select">
      <label htmlFor={name} className="input-select__label text text-small">
        {label}
      </label>
      <select name={name} onChange={handleSelect} value={currentValue}
        className="input-select__select text text-large"
      >
        <option disabled>{defaultValue}</option>
        { list.map((value, i) => (
          <option className="input-select__option text text-large" key={i}>
            {value}
          </option>
        )) }
      </select>
    </div>
  )
}

export default InputSelect
