import React from 'react'

export interface Props {
  isDisplayed: boolean
  isActive: boolean
  label: string
  classNames: string[]

  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({ isDisplayed, isActive, label, classNames, onClick }: Props) => {
  const cls = [...classNames, 'button', 'text text-medium'].join(' ')
  return (
    <button className={cls} disabled={!isActive}
      style={{
        display: isDisplayed ? 'flex' : 'none',
        opacity: isActive ? '1' : '.7'
      }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button