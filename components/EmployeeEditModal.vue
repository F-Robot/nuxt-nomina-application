<script setup lang="ts">
import EmployeeForm from '~/components/EmployeeForm.vue'
import type { Ref } from 'vue'
import { GetEmployeeDto } from '~~/types'

interface Emits {
  (e: 'submit', employee: GetEmployeeDto): void
  (e: 'update:dialog', ev: boolean): void
}
interface Props {
  dialog: boolean
  employee: GetEmployeeDto
}
const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const emitSubmit = () => {
  clearForm()
  emits('submit', props.employee)
}
const emitShowModal = (showModal: boolean) => emits('update:dialog', showModal)

const title = 'Informacion de Empleado'
const button = 'Actualizar Empleado'

// Dependency Injection from Index
const role = inject<Ref<string>>('roleEdit') ?? ref('')
const name = inject<Ref<string>>('nameEdit') ?? ref('')
const number = inject<Ref<string>>('numberEdit') ?? ref('')
const loading = inject<Ref<boolean>>('loadingEdit') ?? ref(false)

const form = ref<InstanceType<typeof EmployeeForm> | null>(null)
const clearForm = () => form.value.resetForm()
</script>

<template>
  <VDialog :model-value="dialog" @click:outside="emitShowModal(false)">
    <EmployeeForm
      ref="form"
      v-model:number="number"
      v-model:name="name"
      v-model:role="role"
      :loading="loading"
      :button="button"
      :title="title"
      @submit="emitSubmit"
    />
  </VDialog>
</template>
