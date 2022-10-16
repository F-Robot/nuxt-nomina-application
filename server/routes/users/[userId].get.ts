import { getUserById } from '~/server/controllers/users'

export default defineEventHandler((event) => getUserById(event))
