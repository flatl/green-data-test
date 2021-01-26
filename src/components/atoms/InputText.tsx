import React, { ChangeEvent } from 'react'

export interface Props {
  value: string
  name: string
  placeholder: string
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => any
}

const InputText = ({ value, onChange, name, placeholder, label }: Props) => {
  return (
    <div className="input input-text">
      <label htmlFor={name} className="input-text__label text text-small">
        { label }
      </label>
      <input className="input-text__input text text-large"
        value={value} onChange={onChange}
        name={name} placeholder={placeholder} type="text"
      ></input>
    </div>
  )
}

export default InputText
