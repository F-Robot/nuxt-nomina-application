<script setup lang="ts">
import { GetEmployeeDto } from '~/types'

interface Props {
  employee: GetEmployeeDto
}
const props = defineProps<Props>()

const fields = {
  moneyPerMonth: 'Dinero Bruto por mes:',
  taxesPerMonth: 'IVA(ISR) por mes:',
  vouchersPerMonth: 'Cupones por mes:',
  moneyPerMonthWithTaxes: 'Dinero Neto por mes:',
}
const payrollFields = computed(() =>
  Object.keys(props.employee.payroll).map((key) => ({
    payroll: fields[key],
    currency: useCurrency(props.employee.payroll[key]),
  }))
)
</script>
<template>
  <VCard class="pa-10" max-width="544">
    <VCardTitle class="text-primary">Nomina de Empleado</VCardTitle>
    <VCardText>
      <VList lines="two">
        <VListItem>
          <VListItemTitle>Entregas por mes:</VListItemTitle>
          <VListItemSubtitle>{{ employee.deliveries }}</VListItemSubtitle>
        </VListItem>
        <VListItem v-for="field in payrollFields" :key="field.payroll">
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
