import pg from '~/server/services/postgresql'
import { useMonthsAgo } from '~/composables/useMonthsAgo'
import {
  parseToInt,
  parseToGetUserDto,
  parseToEmployeeInformation,
} from '~/utils/types'
import {
  CREATE_EMPLOYEE_TABLE_QUERY,
  DELETE_EMPLOYEE_TABLE_QUERY,
  INSERT_EMPLOYEE_TABLE_QUERY,
  SELECT_EMPLOYEE_BY_ID_QUERY,
  SELECT_EMPLOYEE_TABLE_QUERY,
  UPDATE_EMPLOYEE_DATE_TABLE_QUERY,
  UPDATE_EMPLOYEE_DELIVERIES_TABLE_QUERY,
  UPDATE_EMPLOYEE_IFORMATION_TABLE_QUERY,
} from '~/constants'
import type {
  UserDto,
  GetUserDto,
  PatchUserDto,
  CreateUserDto,
  InsertUserDto,
  RemoveUserDto,
  SelectUserDto,
  UpdateUserDeliveriesDto,
  UpdateUserInformationDto,
  UpdateUserMonthsDto,
} from '~/types'

class UsersDao {
  constructor() {
    pg.query(CREATE_EMPLOYEE_TABLE_QUERY)
  }
  async getUsers(): Promise<GetUserDto[]> {
    const res = await pg.query<UserDto>(SELECT_EMPLOYEE_TABLE_QUERY)
    const users = parseToGetUserDto(res.rows)
    return users
  }
  async getUserById(userId: number): Promise<GetUserDto> {
    userId = parseToInt(userId)
    const id: SelectUserDto = [userId]
    const res = await pg.query<UserDto>(SELECT_EMPLOYEE_BY_ID_QUERY, id)
    const users = parseToGetUserDto(res.rows)
    return users[0]
  }
  async addUser(user: CreateUserDto) {
    user.number = parseToInt(user.number)
    const newUser: InsertUserDto = [user.number, user.role, user.name]
    const res = await pg.query<UserDto>(INSERT_EMPLOYEE_TABLE_QUERY, newUser)
    return res.rows[0].id
  }
  async removeUserById(userId: number) {
    userId = parseToInt(userId)
    const id: RemoveUserDto = [userId]
    const res = await pg.query<UserDto>(DELETE_EMPLOYEE_TABLE_QUERY, id)
    return res.rows[0].id
  }
  async patchUserById(userId: number, user: PatchUserDto) {
    userId && (userId = parseToInt(userId))

    if (typeof user.months !== 'undefined') {
      user.months = parseToInt(user.months)
      const createdAt = (await this.getUserById(userId)).createdat
      const workedDate = useMonthsAgo(user.months, createdAt)
      const date: UpdateUserMonthsDto = [userId, workedDate]
      await this.updateMonths(date)
      return userId
    }

    if (typeof user.deliveries !== 'undefined') {
      user.deliveries = parseToInt(user.deliveries)
      const deliveries: UpdateUserDeliveriesDto = [userId, user.deliveries]
      await this.updateDelivery(deliveries)
      return userId
    }

    user.number && (user.number = parseToInt(user.number))
    const information = parseToEmployeeInformation(userId, user)
    await this.updateInformation(information)
    return userId
  }
  async updateDelivery(deliveries: UpdateUserDeliveriesDto) {
    await pg.query<UserDto>(UPDATE_EMPLOYEE_DELIVERIES_TABLE_QUERY, deliveries)
  }
  async updateInformation(information: UpdateUserInformationDto) {
    await pg.query<UserDto>(UPDATE_EMPLOYEE_IFORMATION_TABLE_QUERY, information)
  }
  async updateMonths(months: UpdateUserMonthsDto) {
    await pg.query<UserDto>(UPDATE_EMPLOYEE_DATE_TABLE_QUERY, months)
  }
}

export default new UsersDao()
