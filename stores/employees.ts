import { Employee } from '~/types'

export const useEmployeesStore = defineStore('employees', () => {
  const employees = ref<Employee[]>([])

  const fetchEmployeees = async () => {
    const data = await $fetch<Employee[]>('/users')
    if (data) employees.value = data
  }
  const createEmployee = async (employee: Employee) => {
    await $fetch('/users', { method: 'post', body: employee })
  }
  const editEmployee = async (employeeId: string, employee: Employee) => {
    await $fetch(`/users/${employeeId}`, { method: 'PATCH', body: employee })
  }
  const deleteEmployee = async (employee: Employee) => {
    await $fetch(`/users/${employee.id}`, { method: 'DELETE' })
  }
  return {
    employees,
    editEmployee,
    createEmployee,
    deleteEmployee,
    fetchEmployeees,
  }
})
