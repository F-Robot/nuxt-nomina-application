<script setup lang="ts">
import EmployeeDeliveryModal from '~/components/EmployeeDeliveryModal.vue'
import EmployeePayrollModal from '~/components/EmployeePayrollModal.vue'
import EmployeeMonthsModal from '~/components/EmployeeMonthsModal.vue'
import EmployeeEditModal from '~/components/EmployeeEditModal.vue'
import EmployeeForm from '~/components/EmployeeForm.vue'
import EmployeeList from '~/components/EmployeeList.vue'
import { useEmployeesStore } from '~/stores/employees'
import { parseToRole } from '~/utils/types'
import { storeToRefs } from 'pinia'

import type { GetUserDto, Role } from '~/types'
type Form = InstanceType<typeof EmployeeForm> | null

const store = useEmployeesStore()

const { createEmployee, fetchEmployeees, deleteEmployee, editEmployee } = store
const { employees } = storeToRefs(store)

const tabColor = 'primary'
const title = 'Registrar Empleado'
const button = 'Registrar Empleado'

const role = ref<Role | ''>('')
const name = ref('')
const number = ref('')
const tabModel = ref('')
const loading = ref(false)
const showEditModal = ref(false)
const showPayrollModal = ref(false)
const showCalendarModal = ref(false)
const showDeliveryModal = ref(false)

const tabs = ref([
  { text: 'Agregar empleado', value: 'add' },
  { text: 'Listar empleado', value: 'list' },
])

const selectedEmployee = ref<GetUserDto>()

// Dependency Injection to EditModalForm
const roleEdit = ref('')
const nameEdit = ref('')
const numberEdit = ref('')
const loadingEdit = ref(false)

provide('roleEdit', roleEdit)
provide('nameEdit', nameEdit)
provide('numberEdit', numberEdit)
provide('loadingEdit', loadingEdit)

// Dependency Injection to DeliveryModalForm
const delivery = ref('')
const loadingDelivery = ref(false)

provide('delivery', delivery)
provide('loadingDelivery', loadingDelivery)

// Dependency Injection to MonthsModalForm
const months = ref('')
const loadingMonths = ref(false)

provide('months', months)
provide('loadingMonths', loadingMonths)

const formSubmit = async () => {
  loading.value = true
  if (role.value === '') return
  await createEmployee({
    role: role.value,
    name: name.value,
    number: parseInt(number.value),
  })
  await fetchEmployeees()
  clearForm()
  tabModel.value = 'list'
  loading.value = false
}
const editSubmit = async () => {
  loadingEdit.value = true
  await editEmployee(selectedEmployee.value.id, {
    name: nameEdit.value,
    role: parseToRole(roleEdit.value),
    number: parseInt(numberEdit.value),
  })
  await fetchEmployeees()
  loadingEdit.value = false
  showEditModal.value = false
  nameEdit.value = ''
  numberEdit.value = ''
}
const editDelivery = async () => {
  loadingDelivery.value = true
  await editEmployee(selectedEmployee.value.id, {
    deliveries: parseInt(delivery.value),
  })
  await fetchEmployeees()
  loadingDelivery.value = false
  showDeliveryModal.value = false
  delivery.value = ''
}
const editMonths = async () => {
  loadingMonths.value = true
  await editEmployee(selectedEmployee.value.id, {
    months: parseInt(months.value),
  })
  await fetchEmployeees()
  loadingMonths.value = false
  showCalendarModal.value = false
  months.value = ''
}
const deleteSubmit = async (employee: GetUserDto) => {
  await deleteEmployee(employee.id)
  await fetchEmployeees()
}
const clickCash = (employee: GetUserDto) => {
  selectedEmployee.value = employee
  showPayrollModal.value = true
}
const clickEdit = (employee: GetUserDto) => {
  selectedEmployee.value = employee
  showEditModal.value = true
}
const clickDelivery = (employee: GetUserDto) => {
  selectedEmployee.value = employee
  showDeliveryModal.value = true
}
const clickCalendar = (employee: GetUserDto) => {
  selectedEmployee.value = employee
  showCalendarModal.value = true
}
const form = ref<Form>(null)
const clearForm = () => {
  name.value = ''
  number.value = ''
  form.value.resetForm()
}
</script>
<template>
  <VContainer fluid>
    <VTabs
      v-model="tabModel"
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
    <VWindow v-model="tabModel" class="mt-3">
      <VWindowItem :value="tabs[0].value">
        <EmployeeForm
          ref="form"
          v-model:number="number"
          v-model:name="name"
          v-model:role="role"
          :loading="loading"
          :button="button"
          :title="title"
          @submit="formSubmit"
        />
      </VWindowItem>
      <VWindowItem :value="tabs[1].value">
        <EmployeeList
          :employees="employees"
          @click-edit="clickEdit"
          @click-cash="clickCash"
          @click-delete="deleteSubmit"
          @click-calendar="clickCalendar"
          @click-delivery="clickDelivery"
        />
        <EmployeePayrollModal
          v-model:dialog="showPayrollModal"
          :employee="selectedEmployee"
        />
        <EmployeeDeliveryModal
          v-model:dialog="showDeliveryModal"
          :employee="selectedEmployee"
          @submit="editDelivery"
        />
        <EmployeeMonthsModal
          v-model:dialog="showCalendarModal"
          :employee="selectedEmployee"
          @submit="editMonths"
        />
        <EmployeeEditModal
          v-model:dialog="showEditModal"
          :employee="selectedEmployee"
          @submit="editSubmit"
        />
      </VWindowItem>
    </VWindow>
  </VContainer>
</template>
