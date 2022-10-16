import { createUser } from '@/server/controllers/users'

export default defineEventHandler((event) => createUser(event))
