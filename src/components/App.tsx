import React, { useState } from 'react'
import * as uuid from 'uuid'

import { Employee, NullEmployee } from './../models'
import { LocalStorageDBImplementation } from './../lib/LocalStorageDB'

import EmployeeList from './../components/EmployeeList'
import EmployeeForm from './../components/Form'
import Button from './../components/atoms/Button'
import ModalWindow from './../components/atoms/Modal'

import './../assets/css/app.scss'

const positions = ['пекарь-виртуоз', 'охранник', 'топ-менеджер', 'кондитер', 'бухгалтер', 'разнорабочий'] 

const employeeDB = new LocalStorageDBImplementation<Employee>('employee')

let hasAnyUnsavedChanges = false

const App = () => {
  const [employees, setEmployees] = useState(employeeDB.getAll())
  const [currentEmployee, setCurrentEmployee] = useState(NullEmployee)

  const [isFormValid, setIsFormValid] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const isNewEmployee = currentEmployee.id === NullEmployee.id

  const setEmployeeProxy = (employee: Employee) => {
    setCurrentEmployee(employee)
    hasAnyUnsavedChanges = true
  } 

  const handleSave = () => {
    if (isNewEmployee) {
      const employeeWithId = { ...currentEmployee, id: uuid.v4() }
      employeeDB.setItem(employeeWithId.id, employeeWithId)
    } else if (employeeDB.isItemInDB(currentEmployee.id)) {
      employeeDB.updateItem(currentEmployee.id, currentEmployee)
    } else {
      throw new Error('Cannot find employee with id ' + currentEmployee.id)
    }

    setCurrentEmployee(NullEmployee)
    hasAnyUnsavedChanges = false
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setCurrentEmployee(NullEmployee)
  }

  const handleRemove = () => {
    employeeDB.removeItem(currentEmployee.id)
    hasAnyUnsavedChanges = false
  }

  const handleUpdate = () => {
    if (hasAnyUnsavedChanges) {
      showModal()
    } else {
      setEmployees(employeeDB.getAll())
      setCurrentEmployee(NullEmployee)
    }
  }

  const handleContinue = () => {
    setIsModalOpen(false)
    hasAnyUnsavedChanges = false
    handleUpdate()
  }

  const handleSelectEmployee = (employee: Employee) => () => {
    setCurrentEmployee(employee)
  }

  return (
    <div className="App">
      <aside className="aside">
        <header className="header text-large">
          <div className="title">Список сотрудников</div>
        </header>

        <EmployeeList list={ employees } currentEmployee={currentEmployee}
          handleSelect={handleSelectEmployee}
        />
      </aside>

      <main className="content">
        <header className="header">
          { isNewEmployee && (
            <div className="title text-large">Добавить сотрудника</div>
          )}
          { !isNewEmployee && (
            <div className="title text-large">Редактировать сотрудника</div>
          )}
        </header>

        <EmployeeForm currentEmployee={currentEmployee} positions={positions}
          setCurrentEmployee={setEmployeeProxy}
          onIsFormValid={(value: boolean) => setIsFormValid(value)}
        />

        <div className="buttons">
          <Button onClick={handleUpdate} isDisplayed={true} isActive={true}
            label="Обновить" classNames={["update"]}
          />

          <Button onClick={handleAdd} isDisplayed={!isNewEmployee} isActive={true}
            label="Добавить" classNames={["add"]}
          />

          <Button onClick={handleSave} isDisplayed={true} isActive={isFormValid}
            label="Сохранить" classNames={["save"]}
          />

          <Button onClick={handleRemove} isDisplayed={!isNewEmployee} isActive={true}
            label="Удалить" classNames={["remove"]}
          />
        </div>
      </main>

      <ModalWindow isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <section className="title text text-large">Если продолжить текущие изменения будут потеряны, вы уверены?</section>

        <section className="buttons">
          <Button onClick={() => setIsModalOpen(false)} isDisplayed={true} isActive={true}
            label="Закрыть" classNames={["close"]}
          />

          <Button onClick={handleContinue } isDisplayed={true} isActive={true}
            label="Продолжить" classNames={["continue"]}
          />
        </section>
      </ModalWindow>
    </div>
  );
}

export default App
