<script setup lang="ts">
import EmployeeAvatar from '~/components/EmployeeAvatar.vue'
import TrashIcon from '~/components/TrashIcon.vue'
import type { Employee } from '~/types'

interface Emits {
  (e: 'clickTrash', employee: Employee): void
}
interface Props {
  employees: Employee[]
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const hasEmployees = computed(() => props.employees.length !== 0)

const clickTrash = (employee: Employee) => emit('clickTrash', employee)
const getTitle = (employee: Employee) => `${employee.name} #${employee.number}`
</script>
<template>
  <v-card v-if="hasEmployees" class="mx-auto my-1" max-width="600">
    <v-list lines="two">
      <v-list-item
        v-for="employee in props.employees"
        :key="employee.name"
        :subtitle="employee.role"
        :title="getTitle(employee)"
      >
        <template #prepend><EmployeeAvatar /></template>
        <template #append><TrashIcon @click="clickTrash(employee)" /></template>
      </v-list-item>
    </v-list>
  </v-card>
  <div v-else>There are no registered employees :(</div>
</template>
