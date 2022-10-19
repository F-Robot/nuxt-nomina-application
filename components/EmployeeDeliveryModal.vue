<script setup lang="ts">
import EmployeeFormDelivery from '~/components/EmployeeFormDelivery.vue'

import type { Ref } from 'vue'
import type { GetUserDto } from '~/types'

interface Emits {
  (e: 'submit', employee: GetUserDto): void
  (e: 'update:dialog', ev: boolean): void
}
interface Props {
  dialog: boolean
  employee: GetUserDto
}
const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const emitSubmit = () => {
  clearForm()
  emits('submit', props.employee)
}
const emitShowModal = (showModal: boolean) => emits('update:dialog', showModal)

const title = 'Actualizar Envios'

// Dependency Injection from Index
const delivery = inject<Ref<string>>('delivery') ?? ref('')
const loading = inject<Ref<boolean>>('loadingDelivery') ?? ref(false)

const form = ref<InstanceType<typeof EmployeeFormDelivery> | null>(null)
const clearForm = () => form.value.resetForm()
</script>

<template>
  <VDialog :model-value="dialog" @click:outside="emitShowModal(false)">
    <EmployeeFormDelivery
      ref="form"
      v-model:delivery="delivery"
      :deliveries="employee.deliveries"
      :loading="loading"
      :button="title"
      :title="title"
      @submit="emitSubmit"
    />
  </VDialog>
</template>
