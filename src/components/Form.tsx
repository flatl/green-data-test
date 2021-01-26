import React from 'react'
import { Employee, Sex } from './../models'

import InputCheckBox from './../components/atoms/InputCheckBox'
import InputText from './../components/atoms/InputText'
import InputSelect from './../components/atoms/InputSelect'

export interface Props {
  currentEmployee: Employee
  positions: string[]

  setCurrentEmployee: (employee: Employee) => void
  onIsFormValid: (value: boolean) => void
}

const EmployeeForm = ({ currentEmployee, positions, setCurrentEmployee, onIsFormValid }: Props) => {
  
  const handleChangeEmployeeField = (field: string) => (event: any) => {
    setCurrentEmployee({ ...currentEmployee, [field]: event.target.value })
  }

  const handleSelectSex = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setCurrentEmployee({ ...currentEmployee, sex: (value as Sex) })
  } 

  const handleSelectPosition = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setCurrentEmployee({ ...currentEmployee, position: value })
  }

  const toggleIsDismissed = () => {
    setCurrentEmployee({ ...currentEmployee, isDismissed: !currentEmployee.isDismissed })
  }

  const isFormValid = currentEmployee.surname.length > 1
    && currentEmployee.name.length > 1
    && currentEmployee.patronymic.length > 1
    && currentEmployee.position !== ''
  console.log(isFormValid)
  onIsFormValid(isFormValid)

  return (
    <form className="form">
    <InputText value={currentEmployee.surname} onChange={handleChangeEmployeeField('surname')}
      name="surname" label="Фамилия" placeholder=""
    />

    <InputText value={currentEmployee.name} onChange={handleChangeEmployeeField('name')}
      name="name" label="Имя" placeholder=""
    />

    <InputText value={currentEmployee.patronymic} onChange={handleChangeEmployeeField('patronymic')}
      name="patronymic" label="Отчество" placeholder=""
    />

    <InputSelect list={positions} currentValue={currentEmployee.position}
      handleSelect={handleSelectPosition} defaultValue="Выбрать должность"
      name="position" label="Должность"
    />

    <InputSelect list={['М', 'Ж']} currentValue={currentEmployee.sex}
      handleSelect={handleSelectSex} defaultValue="Выбрать пол"
      name="sex" label="Пол"
    />

    <InputCheckBox isChecked={currentEmployee.isDismissed} onToggle={toggleIsDismissed}
      name="dismissed" label="Уволен?"
    />
    </form>
  )
}

export default EmployeeForm
