const formatter = new Intl.NumberFormat(`es-MX`, {
  currency: `MXN`,
  style: 'currency',
})
export const useCurrency = (number: number) => formatter.format(number)
