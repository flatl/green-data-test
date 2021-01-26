import React from 'react'
import { Employee } from './../models/index'

export interface Props {
  list: Employee[]
  currentEmployee: Employee
  handleSelect: (item: Employee) => () => void
}

const EmployeeList = ({ list, currentEmployee, handleSelect }: Props) => {
  const getCls = (item: Employee) => (
    item.id === currentEmployee.id ? 'employee-list__item selected' : 'employee-list__item' 
  )

  return (
    <div className="employee-list">
      { list.map((item, i) => (
        <div onClick={handleSelect(item)}
          className={getCls(item)} key={i}
        >
          <div className="employee-list__item-name">
            { `${item.surname} ${item.name} ${item.patronymic}` }
          </div>
          <div className="employee-list__item-position">
            { item.position }
          </div>

          <div className="background"></div>
        </div> 
      ))}
    </div>
  );
}

export default EmployeeList 