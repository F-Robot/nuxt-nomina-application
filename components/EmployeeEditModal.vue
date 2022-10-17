<script setup lang="ts">
import EmployeeForm from '~/components/EmployeeForm.vue'
import type { Ref } from 'vue'

interface Emits {
  (e: 'submit', employeeId: string): void
  (e: 'update:dialog', ev: boolean): void
}
interface Props {
  dialog: boolean
  employeeId: string
}
const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const emitSubmit = () => emits('submit', props.employeeId)
const emitShowModal = (showModal: boolean) => emits('update:dialog', showModal)

const title = 'Informacion de Empleado'
const button = 'Actualizar Empleado'

// Dependency Injection from Index
const role = inject<Ref<string>>('roleEdit') ?? ref('')
const name = inject<Ref<string>>('nameEdit') ?? ref('')
const number = inject<Ref<string>>('numberEdit') ?? ref('')
const loading = inject<Ref<boolean>>('loadingEdit') ?? ref(false)
</script>

<template>
  <VDialog :model-value="dialog" @click:outside="emitShowModal(false)">
    <EmployeeForm
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
