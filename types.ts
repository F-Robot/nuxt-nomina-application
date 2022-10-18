export type Role = 'Chofer' | 'Auxiliar' | 'Cargador'

export interface Payroll {
  moneyPerMonth: number
  taxesPerMonth: number
  hoursPerDay: number
  vouchersPerMonth: number
  moneyPerDeliveries: number
  moneyPerMonthWithTaxes: number
}

export interface CreateUserDto {
  id: string
  role: Role
  name: string
  number: string
  payroll: Payroll
  deliveries: number
  createdAt: string
}
export interface PatchUserDto {
  name?: string
  role?: string
  number?: string
  deliveries?: number
}
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
  number?: string
  deliveries?: number | string
}
export interface CRUD {
  list: (limit: number, page: number) => Promise<any>
  create: (resource: any) => Promise<any>
  readById: (id: string) => Promise<any>
  deleteById: (id: string) => Promise<string>
  patchById: (id: string, resource: any) => Promise<string>
}
