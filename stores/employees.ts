import { GetUserDto, CreateUserDto, PatchUserDto } from '~/types'

export const useEmployeesStore = defineStore('employees', () => {
  const employees = ref<GetUserDto[]>([])

  const fetchEmployeees = async () => {
    const data = await $fetch<GetUserDto[]>('/users')
    if (data) employees.value = data
  }
  const createEmployee = async (employee: CreateUserDto) => {
    await $fetch('/users', { method: 'post', body: employee })
  }
  const editEmployee = async (employeeId: number, employee: PatchUserDto) => {
    await $fetch(`/users/${employeeId}`, { method: 'PATCH', body: employee })
  }
  const deleteEmployee = async (employeeId: number) => {
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
