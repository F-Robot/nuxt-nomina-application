<script setup lang="ts">
import EmployeeAvatar from '~/components/EmployeeAvatar.vue'
import DeliveryIcon from '~/components/DeliveryIcon.vue'
import PencilIcon from '~/components/PencilIcon.vue'
import TrashIcon from '~/components/TrashIcon.vue'
import CashIcon from '~/components/CashIcon.vue'

import type { GetEmployeeDto } from '~/types'

interface Emits {
  (e: 'clickDelivery', employee: GetEmployeeDto): void
  (e: 'clickDelete', employee: GetEmployeeDto): void
  (e: 'clickEdit', employee: GetEmployeeDto): void
  (e: 'clickCash', employee: GetEmployeeDto): void
}
interface Props {
  employees: GetEmployeeDto[]
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const clickEdit = (employee: GetEmployeeDto) => emit('clickEdit', employee)
const clickCash = (employee: GetEmployeeDto) => emit('clickCash', employee)
const clickDelete = (employee: GetEmployeeDto) => emit('clickDelete', employee)
const clickDelivery = (employee: GetEmployeeDto) =>
  emit('clickDelivery', employee)

const hasEmployees = computed(() => props.employees.length !== 0)
const getTitle = (employee: GetEmployeeDto) =>
  `${employee.name} #${employee.number}`
</script>
<template>
  <v-card v-if="hasEmployees" class="mx-auto my-1" max-width="90%">
    <v-list lines="two">
      <v-list-item
        v-for="employee in props.employees"
        :key="employee.name"
        :subtitle="employee.role"
      >
        <template #title>
          <span class="text-capitalize">{{ getTitle(employee) }}</span>
        </template>
        <template #prepend><EmployeeAvatar /></template>
        <template #append>
          <CashIcon @click="clickCash(employee)" />
          <DeliveryIcon @click="clickDelivery(employee)" />
          <PencilIcon @click="clickEdit(employee)" />
          <TrashIcon @click="clickDelete(employee)" />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
  <div v-else>There are no registered employees :(</div>
</template>
