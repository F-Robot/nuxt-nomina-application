import { usePayrollMonths } from './useDayPayroll'
import {
  DAYS_PER_WEEK,
  HOURS_PER_DAY,
  WEEK_PER_MONTH,
  HOURS_PER_MONTH,
  PAYMENT_PER_HOUR,
  PERCENT_BASE_IVA,
  PERCENT_BONUS_IVA,
  PAYMENT_PER_DELIVERY,
  PAYMENT_FOR_BONUS_IVA,
  PAYMENT_BONUS_PER_HOUR,
  PERCENT_BONUS_VOUCHERS,
} from '~/constants'

import type { Payroll, UserDto } from '~/types'

export const usePayroll = (user: UserDto): Payroll => {
  let workedMonths = usePayrollMonths(
    new Date(user.createdat),
    new Date(user.workeddate)
  )
  workedMonths = workedMonths >= 1 ? 1 : 0
  const workedHoursPerMonth = workedMonths >= 1 ? HOURS_PER_MONTH : 0

  const moneyPerDeliveries = PAYMENT_PER_DELIVERY * user.deliveries
  const moneyBonusPerDay = PAYMENT_BONUS_PER_HOUR[user.role] * HOURS_PER_DAY

  const moneyPerDay = HOURS_PER_DAY * PAYMENT_PER_HOUR + moneyBonusPerDay
  const moneyPerWeek = DAYS_PER_WEEK * moneyPerDay
  const moneyPerMonth = WEEK_PER_MONTH * moneyPerWeek + moneyPerDeliveries
  const moneyPerMonthWorked = moneyPerMonth * workedMonths

  const taxesPercent =
    moneyPerMonthWorked > PAYMENT_FOR_BONUS_IVA
      ? PERCENT_BASE_IVA + PERCENT_BONUS_IVA
      : PERCENT_BASE_IVA

  const taxesPerMonth = moneyPerMonthWorked * taxesPercent
  const moneyPerMonthWithTaxes = moneyPerMonthWorked - taxesPerMonth
  const vouchersPerMonth = moneyPerMonthWorked * PERCENT_BONUS_VOUCHERS

  return {
    taxesPerMonth,
    vouchersPerMonth,
    moneyPerDeliveries,
    workedHoursPerMonth,
    moneyPerMonthWithTaxes,
    moneyPerMonth: moneyPerMonthWorked,
  }
}
