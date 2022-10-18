import { GetEmployeeDto, CreateEmployeeDto, UpdateEmployeeDto } from '~/types'

export const useEmployeesStore = defineStore('employees', () => {
  const employees = ref<GetEmployeeDto[]>([])

  const fetchEmployeees = async () => {
    const data = await $fetch<GetEmployeeDto[]>('/users')
    if (data) employees.value = data
  }
  const createEmployee = async (employee: CreateEmployeeDto) => {
    await $fetch('/users', { method: 'post', body: employee })
  }
  const editEmployee = async (
    employeeId: string,
    employee: UpdateEmployeeDto
  ) => {
    await $fetch(`/users/${employeeId}`, { method: 'PATCH', body: employee })
  }
  const deleteEmployee = async (employeeId: string) => {
    await $fetch(`/users/${employeeId}`, { method: 'DELETE' })
  }
  return {
    employees,
    editEmployee,
    createEmployee,
    deleteEmployee,
    fetchEmployeees,
  }
})
