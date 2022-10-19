import { usePayroll } from '~~/composables/usePayroll'
import type {
  UserDto,
  GetUserDto,
  PatchUserDto,
  UpdateUserInformationDto,
  Role,
} from '~/types'

export const parseToInt = (value: number | string): number => {
  if (typeof value !== 'number') return parseInt(value)
  return value
}
export const parseToRole = (value: string): Role => {
  if (typeof value !== 'string') throw Error('Invalid type value for role')
  if (value === 'Chofer' || value === 'Auxiliar' || value === 'Cargador') {
    return value
  }
  throw Error('Invalid value for role')
}
export const parseToEmployeeInformation = (
  userId: number,
  user: PatchUserDto
): UpdateUserInformationDto => {
  return [userId, user.number, user.role, user.name]
}
export const parseToGetUserDto = (users: UserDto[]): GetUserDto[] => {
  return users.map((user) => ({
    ...user,
    payroll: usePayroll(user),
  }))
}
