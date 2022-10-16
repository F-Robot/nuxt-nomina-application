import { listUsers } from '@/server/controllers/users'

export default defineEventHandler(() => listUsers())
