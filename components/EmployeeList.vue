<script setup lang="ts">
import EmployeeAvatar from '~/components/EmployeeAvatar.vue'
import PencilIcon from '~/components/PencilIcon.vue'
import TrashIcon from '~/components/TrashIcon.vue'
import CashIcon from '~/components/CashIcon.vue'
import type { Employee } from '~/types'

interface Emits {
  (e: 'clickDelete', employee: Employee): void
  (e: 'clickEdit', employee: Employee): void
  (e: 'clickCash', employee: Employee): void
}
interface Props {
  employees: Employee[]
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const clickEdit = (employee: Employee) => emit('clickEdit', employee)
const clickCash = (employee: Employee) => emit('clickCash', employee)
const clickDelete = (employee: Employee) => emit('clickDelete', employee)

const hasEmployees = computed(() => props.employees.length !== 0)
const getTitle = (employee: Employee) => `${employee.name} #${employee.number}`
</script>
<template>
  <v-card v-if="hasEmployees" class="mx-auto my-1" max-width="90%">
    <v-list lines="two">
      <v-list-item
        v-for="employee in props.employees"
        :key="employee.name"
        :subtitle="employee.role"
        :title="getTitle(employee)"
      >
        <template #prepend><EmployeeAvatar /></template>
        <template #append>
          <CashIcon @click="clickCash(employee)" />
          <PencilIcon @click="clickEdit(employee)" />
          <TrashIcon @click="clickDelete(employee)" />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
  <div v-else>There are no registered employees :(</div>
</template>
