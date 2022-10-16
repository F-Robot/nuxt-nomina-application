export default defineEventHandler(
  (event) => `PUT requested for id ${event.context.params.userId}`
)
