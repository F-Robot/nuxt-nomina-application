<script setup lang="ts">
import EmployeeForm from '~/components/EmployeeForm.vue'
import EmployeeList from '~/components/EmployeeList.vue'
import { useEmployeesStore } from '~/stores/employees'
import { storeToRefs } from 'pinia'

import type { Ref } from 'vue'
import { Employee } from '~~/types'

const store = useEmployeesStore()

const { createEmployee, fetchEmployeees, deleteEmployee } = store
const { employees } = storeToRefs(store)

const tabClass = 'mx-auto'
const tabColor = 'primary'

const role = ref('')
const name = ref('')
const model = ref('')
const number = ref('')
const loading = ref(false)

const tabs = ref([
  { text: 'Agregar empleado', value: 'add' },
  { text: 'Listar empleado', value: 'list' },
  { text: 'Editar empleado', value: 'update' },
])

const resetForm = (fields: Ref[]) => fields.map((field) => (field.value = null))

const submitForm = async () => {
  loading.value = true
  await createEmployee({
    role: role.value,
    name: name.value,
    number: number.value,
  })
  await fetchEmployeees()
  resetForm([name, number])
  model.value = 'list'
  loading.value = false
}

const clickTrash = async (employee: Employee) => {
  await deleteEmployee(employee)
  await fetchEmployeees()
}
</script>
<template>
  <VContainer fluid>
    <VTabs v-model="model" fixed-tabs @update:model-value="fetchEmployeees">
      <VTab
        v-for="(tab, index) in tabs"
        :key="index"
        :class="tabClass"
        :color="tabColor"
        :value="tab.value"
      >
        {{ tab.text }}
      </VTab>
    </VTabs>
    <VWindow v-model="model" class="mt-3">
      <VWindowItem :value="tabs[0].value">
        <EmployeeForm
          v-model:number="number"
          v-model:name="name"
          v-model:role="role"
          :loading="loading"
          @submit="submitForm"
        />
      </VWindowItem>
      <VWindowItem :value="tabs[1].value">
        <EmployeeList :employees="employees" @click-trash="clickTrash" />
      </VWindowItem>
      <VWindowItem :value="tabs[2].value">
        <EmployeeList :employees="employees" />
      </VWindowItem>
    </VWindow>
  </VContainer>
</template>
