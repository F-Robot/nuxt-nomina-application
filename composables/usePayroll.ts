import {
  DAYS_PER_WEEK,
  HOURS_PER_DAY,
  WEEK_PER_MONTH,
  PAYMENT_PER_HOUR,
  PERCENT_BASE_IVA,
  PERCENT_BONUS_IVA,
  PAYMENT_PER_DELIVERY,
  PAYMENT_FOR_BONUS_IVA,
  PAYMENT_BONUS_PER_HOUR,
  PERCENT_BONUS_VOUCHERS,
} from '~/constants'

import type { Role } from '~/types'

export const usePayroll = (role: Role, deliveries = 0) => {
  const moneyPerDeliveries = PAYMENT_PER_DELIVERY * deliveries
  const moneyBonusPerDay = PAYMENT_BONUS_PER_HOUR[role] * HOURS_PER_DAY

  const moneyPerDay = HOURS_PER_DAY * PAYMENT_PER_HOUR + moneyBonusPerDay
  const moneyPerWeek = DAYS_PER_WEEK * moneyPerDay
  const moneyPerMonth = WEEK_PER_MONTH * moneyPerWeek + moneyPerDeliveries

  const taxesPercent =
    moneyPerMonth > PAYMENT_FOR_BONUS_IVA
      ? PERCENT_BASE_IVA + PERCENT_BONUS_IVA
      : PERCENT_BASE_IVA

  const taxesPerMonth = moneyPerMonth * taxesPercent
  const moneyPerMonthWithTaxes = moneyPerMonth - taxesPerMonth
  const vouchersPerMonth = moneyPerMonth * PERCENT_BONUS_VOUCHERS

  return {
    moneyPerMonth,
    taxesPerMonth,
    vouchersPerMonth,
    moneyPerDeliveries,
    moneyPerMonthWithTaxes,
  }
}
