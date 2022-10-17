<script setup lang="ts">
const label = 'Rol'
const maxWidth = 334
const color = 'primary'
const icon = 'mdi-chevron-right'
const title = 'Registrar Empleado'

const cardClass = 'mx-auto my-1'
const titleClass = 'text-primary'

const role = ref('')
const models = reactive({ name: '', number: '' })

const radios = ref([
  { label: 'Chofer', value: 'chofer' },
  { label: 'Cargador', value: 'cargador' },
  { label: 'Auxiliar', value: 'auxiliar' },
])
const fields = ref([
  { label: 'Nombre', model: 'name' },
  { label: 'Numero', model: 'number' },
])
</script>

<template>
  <VCard :class="cardClass" :max-width="maxWidth">
    <VCardTitle :class="titleClass">{{ title }}</VCardTitle>
    <VContainer>
      <VTextField
        v-for="(field, index) in fields"
        :key="index"
        v-model="models[field.model]"
        :color="color"
        variant="outlined"
        :label="field.label"
      />
      <VRadioGroup v-model="role" :label="label" inline>
        <VRadio
          v-for="(radio, index) in radios"
          :key="index"
          :color="color"
          :label="radio.label"
          :value="radio.value"
        />
      </VRadioGroup>
    </VContainer>
    <VDivider />
    <VCardActions>
      <VSpacer />
      <VBtn :color="color">{{ title }}<VIcon :icon="icon" end /></VBtn>
    </VCardActions>
  </VCard>
</template>
