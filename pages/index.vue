<script setup lang="ts">
import EmployeeEditModal from '~/components/EmployeeEditModal.vue'
import EmployeeForm from '~/components/EmployeeForm.vue'
import EmployeeList from '~/components/EmployeeList.vue'
import { useEmployeesStore } from '~/stores/employees'
import { storeToRefs } from 'pinia'

import type { Ref } from 'vue'
import type { Employee } from '~/types'

const store = useEmployeesStore()

const { createEmployee, fetchEmployeees, deleteEmployee, editEmployee } = store
const { employees } = storeToRefs(store)

const tabColor = 'primary'
const title = 'Registrar Empleado'
const button = 'Registrar Empleado'

const role = ref('')
const name = ref('')
const model = ref('')
const number = ref('')
const loading = ref(false)
const showEditModal = ref(false)
const showCashModal = ref(false)

const tabs = ref([
  { text: 'Agregar empleado', value: 'add' },
  { text: 'Listar empleado', value: 'list' },
])

const editedEmployeeId = ref('')

// Dependency Injection to EditModalForm

const roleEdit = ref('')
const nameEdit = ref('')
const numberEdit = ref('')
const loadingEdit = ref(false)

provide('roleEdit', roleEdit)
provide('nameEdit', nameEdit)
provide('numberEdit', numberEdit)
provide('loadingEdit', loadingEdit)

const resetForm = (fields: Ref[]) => fields.map((field) => (field.value = ''))

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

const clickDelete = async (employee: Employee) => {
  await deleteEmployee(employee)
  await fetchEmployeees()
}
const clickCash = async (employee: Employee) => {
  console.log(employee)
  console.log(showCashModal.value)
}
const clickEdit = async (employee: Employee) => {
  editedEmployeeId.value = employee.id
  showEditModal.value = true
}
const clickEditSubmit = async () => {
  loadingEdit.value = true
  await editEmployee(editedEmployeeId.value, {
    name: nameEdit.value,
    role: roleEdit.value,
    number: numberEdit.value,
  })
  await fetchEmployeees()
  loadingEdit.value = false
  showEditModal.value = false
}
</script>
<template>
  <VContainer fluid>
    <VTabs
      v-model="model"
      fixed-tabs
      centered
      @update:model-value="fetchEmployeees"
    >
      <VTab
        v-for="(tab, index) in tabs"
        :key="index"
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
          :button="button"
          :title="title"
          @submit="submitForm"
        />
      </VWindowItem>
      <VWindowItem :value="tabs[1].value">
        <EmployeeList
          :employees="employees"
          @click-edit="clickEdit"
          @click-cash="clickCash"
          @click-delete="clickDelete"
        />
        <EmployeeEditModal
          v-model:dialog="showEditModal"
          :employee-id="editedEmployeeId"
          @submit="clickEditSubmit"
        />
      </VWindowItem>
    </VWindow>
  </VContainer>
</template>
