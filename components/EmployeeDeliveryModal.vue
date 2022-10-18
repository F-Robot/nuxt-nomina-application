<script setup lang="ts">
import EmployeeFormDelivery from '~/components/EmployeeFormDelivery.vue'

import type { Ref } from 'vue'
import type { GetEmployeeDto } from '~/types'

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

const emitSubmit = () => emits('submit', props.employee)
const emitShowModal = (showModal: boolean) => emits('update:dialog', showModal)

const title = 'Actualizar Envios'

// Dependency Injection from Index
const delivery = inject<Ref<string>>('delivery') ?? ref('')
const loading = inject<Ref<boolean>>('loadingDelivery') ?? ref(false)
</script>

<template>
  <VDialog :model-value="dialog" @click:outside="emitShowModal(false)">
    <EmployeeFormDelivery
      v-model:delivery="delivery"
      :deliveries="employee.deliveries"
      :loading="loading"
      :button="title"
      :title="title"
      @submit="emitSubmit"
    />
  </VDialog>
</template>
