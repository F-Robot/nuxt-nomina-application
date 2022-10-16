export interface CreateUserDto {
  id: string
  name: string
  role: string
  number: string
}
export interface PutUserDto {
  name: string
  role: string
  number: string
}
export interface PatchUserDto {
  name?: string
  role?: string
  number?: string
}
export interface CRUD {
  list: (limit: number, page: number) => Promise<any>
  create: (resource: any) => Promise<any>
  readById: (id: string) => Promise<any>
  deleteById: (id: string) => Promise<string>
  patchById: (id: string, resource: any) => Promise<string>
}