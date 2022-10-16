import { patchUser } from '~/server/controllers/users'

export default defineEventHandler((event) => patchUser(event))
