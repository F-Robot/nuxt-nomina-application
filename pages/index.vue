<script setup lang="ts">
import EmployeeForm from '~/components/EmployeeForm.vue'
import EmployeeList from '~/components/EmployeeList.vue'

const tabClass = 'mx-auto'
const tabColor = 'primary'

const model = ref('')
const tabs = ref([
  { component: EmployeeForm, text: 'Agregar empleado', value: 'add' },
  { component: EmployeeList, text: 'Listar empleado', value: 'list' },
  { component: EmployeeList, text: 'Editar empleado', value: 'update' },
])
</script>
<template>
  <VContainer fluid>
    <VTabs v-model="model" fixed-tabs>
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
      <VWindowItem v-for="(tab, index) in tabs" :key="index" :value="tab.value">
        <component :is="tab.component" />
      </VWindowItem>
    </VWindow>
  </VContainer>
</template>
