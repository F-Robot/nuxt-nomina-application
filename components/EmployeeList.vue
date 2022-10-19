<script setup lang="ts">
import EmployeeAvatar from '~/components/EmployeeAvatar.vue'
import DeliveryIcon from '~/components/DeliveryIcon.vue'
import CalendarIcon from '~/components/CalendarIcon.vue'
import PencilIcon from '~/components/PencilIcon.vue'
import TrashIcon from '~/components/TrashIcon.vue'
import CashIcon from '~/components/CashIcon.vue'

import type { GetUserDto } from '~/types'

interface Emits {
  (e: 'clickDelivery', employee: GetUserDto): void
  (e: 'clickCalendar', employee: GetUserDto): void
  (e: 'clickDelete', employee: GetUserDto): void
  (e: 'clickEdit', employee: GetUserDto): void
  (e: 'clickCash', employee: GetUserDto): void
}
interface Props {
  employees: GetUserDto[]
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const clickEdit = (employee: GetUserDto) => emit('clickEdit', employee)
const clickCash = (employee: GetUserDto) => emit('clickCash', employee)
const clickDelete = (employee: GetUserDto) => emit('clickDelete', employee)
const clickCalendar = (employee: GetUserDto) => emit('clickCalendar', employee)
const clickDelivery = (employee: GetUserDto) => emit('clickDelivery', employee)

const hasEmployees = computed(() => props.employees.length !== 0)
const getTitle = (employee: GetUserDto) =>
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
          <CalendarIcon @click="clickCalendar(employee)" />
          <PencilIcon @click="clickEdit(employee)" />
          <TrashIcon @click="clickDelete(employee)" />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
  <div v-else>There are no registered employees :(</div>
</template>
