export type Sex = 'М' | 'Ж'

export interface Employee {
  id: string
  name: string
  surname: string
  patronymic: string
  position: string
  sex: Sex
  isDismissed: boolean
}

export const NullEmployee: Employee = {
  id: '-1',
  name: '',
  surname: '',
  patronymic: '',
  position: '',
  sex: 'М',
  isDismissed: false
}
