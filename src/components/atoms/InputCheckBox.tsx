import React, { ChangeEvent } from 'react'

export interface Props {
  isChecked: boolean
  name: string
  label: string
  onToggle: (event: ChangeEvent<HTMLInputElement>) => any
}

const InputCheckBox = ({ isChecked, onToggle, name, label }: Props) => {
  return (
    <div className="input input-checkbox">
      <label htmlFor={name} className="input-checkbox__label text text-small">
        {label}
      </label>
      <input checked={isChecked} onChange={onToggle}
        name={name} type="checkbox" className="input-checkbox__input text text-large"
      />
    </div>
  )
}

export default InputCheckBox
