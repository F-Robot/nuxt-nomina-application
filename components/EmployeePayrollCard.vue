<script setup lang="ts">
import { GetUserDto } from '~/types'

interface Props {
  employee: GetUserDto
}
const props = defineProps<Props>()

const fields = {
  workedHoursPerMonth: '0. Horas trabajadas del mes:',
  vouchersPerMonth: '1. Cupones por mes:',
  moneyPerDeliveries: '2. Dinero por entragas del mes:',
  moneyPerMonth: '3. Dinero Bruto por mes:',
  taxesPerMonth: '4. IVA(ISR) por mes:',
  moneyPerMonthWithTaxes: '5. Dinero Neto por mes:',
}
const getCurrency = (key: string, number: number) => {
  if (key === 'workedHoursPerMonth') return `${number} Horas`
  return key !== 'hoursPerDay' ? useCurrency(number) : number
}
const payrollFields = computed(() =>
  Object.keys(props.employee.payroll).map((key) => ({
    payroll: fields[key],
    currency: getCurrency(key, props.employee.payroll[key]),
  }))
)
const payrollFieldsSorted = computed(() =>
  payrollFields.value.sort((a, b) => a.payroll[0] - b.payroll[0])
)
</script>
<template>
  <VCard class="pa-10" max-width="544">
    <VCardTitle class="text-primary">Nomina de Empleado</VCardTitle>
    <VCardSubtitle class="text-primary">
      Entragas: {{ employee.deliveries }}
    </VCardSubtitle>
    <VCardText>
      <VList lines="two">
        <VListItem v-for="field in payrollFieldsSorted" :key="field.payroll">
          <VListItemTitle>{{ field.payroll }}</VListItemTitle>
          <VListItemSubtitle>{{ field.currency }}</VListItemSubtitle>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
<style>
.v-dialog .v-overlay__content {
  width: auto !important;
}
</style>
