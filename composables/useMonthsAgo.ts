export const useMonthsAgo = (months: number, date: string) => {
  const dateParsed = new Date(date)
  if (months === 0) return dateParsed
  return new Date(dateParsed.setMonth(dateParsed.getMonth() + months))
}
