import { nanoid } from 'nanoid'
import { usePayroll } from '~/composables/usePayroll'
import type { CreateUserDto, PatchUserDto } from '~/types'

class UsersDao {
  users: Array<CreateUserDto> = []

  async getUsers(): Promise<CreateUserDto[]> {
    return this.users
  }
  async addUser(user: CreateUserDto): Promise<string> {
    user.id = nanoid()
    user.deliveries = 0
    user.createdAt = Date()
    user.payroll = usePayroll(user.role, user.deliveries)

    this.users.push(user)
    return user.id
  }
  async removeUserById(userId: string) {
    this.users.splice(this.getUserIndexById(userId), 1)
    return `${userId} removed`
  }
  async patchUserById(userId: string, user: PatchUserDto) {
    const userIndex = this.getUserIndexById(userId)
    const currentUser = this.users[userIndex]

    this.setUserFields(userId, user, ['name', 'role', 'number', 'deliveries'])
    currentUser.payroll = usePayroll(currentUser.role, user.deliveries)

    this.users.splice(userIndex, 1, currentUser)
    return `${currentUser.id} patched`
  }

  getUserIndexById(userId: string): number {
    return this.users.findIndex((obj: { id: string }) => obj.id === userId)
  }
  getUserById(userId: string): CreateUserDto {
    return this.users[this.getUserIndexById(userId)]
  }
  setUserFields(id: string, user: PatchUserDto, fields: string[]): void {
    const currentUser = this.getUserById(id)
    fields.map((field) => field in user && (currentUser[field] = user[field]))
  }
}

export default new UsersDao()
