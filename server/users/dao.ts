import { nanoid } from 'nanoid'
import { CreateUserDto, PatchUserDto } from '~/types'

class UsersDao {
  users: Array<CreateUserDto> = []

  async addUser(user: CreateUserDto) {
    user.id = nanoid()
    this.users.push(user)
    return user.id
  }

  async getUsers() {
    return this.users
  }

  async getUserById(userId: string) {
    return this.users.find((user: CreateUserDto) => user.id === userId)
  }
  async removeUserById(userId: string) {
    const userIndex = this.getUserIndexById(userId)
    this.users.splice(userIndex, 1)
    return `${userId} removed`
  }

  async patchUserById(userId: string, user: PatchUserDto) {
    const userIndex = this.getUserIndexById(userId)
    const currentUser = this.users[userIndex]
    const allowedPatchFields = ['name', 'role', 'number']
    allowedPatchFields.map((field) => {
      if (field in user) currentUser[field] = user[field]
    })
    this.users.splice(userIndex, 1, currentUser)
    return `${currentUser.id} patched`
  }

  getUserIndexById(userId: string) {
    return this.users.findIndex((obj: { id: string }) => obj.id === userId)
  }
}

export default new UsersDao()
