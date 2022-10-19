export type Id = number
export type Name = string
export type Months = Date
export type UNumber = number
export type Deliveries = number
export type Role = 'Chofer' | 'Auxiliar' | 'Cargador'
export type RemoveUserDto = [Id]
export type SelectUserDto = [Id]
export type InsertUserDto = [UNumber, Role, Name]
export type UpdateUserMonthsDto = [Id, Months]
export type UpdateUserDeliveriesDto = [Id, Deliveries]
export type UpdateUserInformationDto = [Id, UNumber, Role, Name]

export interface Payroll {
  moneyPerMonth: number
  taxesPerMonth: number
  vouchersPerMonth: number
  moneyPerDeliveries: number
  workedHoursPerMonth: number
  moneyPerMonthWithTaxes: number
}

export interface UserDto {
  id: number
  role: Role
  name: string
  number: number
  createdat: string
  workeddate: string
  deliveries: number
}
export interface GetUserDto extends UserDto {
  payroll: Payroll
}
export interface CreateUserDto {
  role: Role
  name: string
  number: number
}
export interface PatchUserDto {
  role?: Role
  name?: string
  months?: number
  number?: number
  deliveries?: number
}
/////////////////////////////////
export interface CreateEmployeeDto {
  role: Role
  name: string
  number: string
}
export interface GetEmployeeDto {
  id: string
  role: Role
  name: string
  number: string
  payroll: Payroll
  deliveries: number
}
export interface UpdateEmployeeDto {
  name?: string
  role?: string
  number?: number
  deliveries?: number
}
export interface CRUD {
  list: (limit: number, page: number) => Promise<any>
  create: (resource: any) => Promise<any>
  readById: (id: number) => Promise<any>
  deleteById: (id: number) => Promise<number>
  patchById: (id: number, resource: any) => Promise<number>
}
