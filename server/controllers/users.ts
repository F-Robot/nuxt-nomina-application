import service from '~/server/services/users'

import type { H3Event } from 'h3'
import type { CreateUserDto, PatchUserDto } from '~/types'

export const listUsers = async () => await service.list()

export const createUser = async (event: H3Event) => {
  const body = await readBody<CreateUserDto>(event)
  return { id: await service.create(body) }
}
export const patchUser = async (event: H3Event) => {
  const body = await readBody<PatchUserDto>(event)
  return await service.patchById(event.context.params.userId, body)
}
export const removeUser = async (event: H3Event) => {
  return await service.deleteById(event.context.params.userId)
}
export const getUserById = async (event: H3Event) => {
  return await service.readById(event.context.params.userId)
}
