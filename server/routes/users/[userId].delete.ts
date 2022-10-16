import { removeUser } from '~/server/controllers/users'

export default defineEventHandler((event) => removeUser(event))
