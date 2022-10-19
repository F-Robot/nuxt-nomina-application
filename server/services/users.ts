import UsersDao from '~/server/users/dao'
import type { CreateUserDto, PatchUserDto, CRUD } from '~/types'

class UsersService implements CRUD {
  async list() {
    return UsersDao.getUsers()
  }
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource)
  }
  async patchById(id: number, resource: PatchUserDto) {
    return UsersDao.patchUserById(id, resource)
  }
  async deleteById(id: number) {
    return UsersDao.removeUserById(id)
  }
  async readById(id: number) {
    return UsersDao.getUserById(id)
  }
}

export default new UsersService()
