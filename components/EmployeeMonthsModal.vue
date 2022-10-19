<script setup lang="ts">
import EmployeeFormMonths from '~/components/EmployeeFormMonths.vue'

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

const title = 'Actualizar Meses'

// Dependency Injection from Index
const months = inject<Ref<string>>('months') ?? ref('')
const loading = inject<Ref<boolean>>('loadingMonths') ?? ref(false)

const form = ref<InstanceType<typeof EmployeeFormMonths> | null>(null)
const clearForm = () => form.value.resetForm()

const getMonths = (fromDate, toDate) => {
  const fromYear = fromDate.getFullYear()
  const fromMonth = fromDate.getMonth()
  const toYear = toDate.getFullYear()
  const toMonth = toDate.getMonth()
  const months = []

  for (let year = fromYear; year <= toYear; year++) {
    let monthNum = year === fromYear ? fromMonth : 0
    const monthLimit = year === toYear ? toMonth : 11

    for (; monthNum <= monthLimit; monthNum++) {
      let month = monthNum + 1
      months.push({ year, month })
    }
  }
  return months
}
const workedMonths = computed(() => {
  return getMonths(
    new Date(props.employee.createdat),
    new Date(props.employee.workeddate)
  ).length
})
</script>

<template>
  <VDialog :model-value="dialog" @click:outside="emitShowModal(false)">
    <EmployeeFormMonths
      ref="form"
      v-model:months="months"
      :worked-months="workedMonths"
      :loading="loading"
      :button="title"
      :title="title"
      @submit="emitSubmit"
    />
  </VDialog>
</template>
