export default defineEventHandler(
  (event) => `PATCH requested for id ${event.context.params.userId}`
)
