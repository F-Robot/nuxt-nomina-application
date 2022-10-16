export default defineEventHandler(
  (event) => `DELETE requested for id ${event.context.params.userId}`
)
