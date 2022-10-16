export default defineEventHandler(
  (event) => `GET requested for id ${event.context.params.userId}`
)
