<script setup lang="ts">
import EmployeePayrollCard from '~/components/EmployeePayrollCard.vue'
import { GetUserDto } from '~/types'

interface Props {
  dialog: boolean
  employee: GetUserDto
}
interface Emits {
  (e: 'update:dialog', ev: boolean): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const emitShowModal = (showModal: boolean) => emits('update:dialog', showModal)
</script>

<template>
  <VDialog :model-value="dialog" @click:outside="emitShowModal(false)">
    <EmployeePayrollCard :employee="props.employee" />
  </VDialog>
</template>
