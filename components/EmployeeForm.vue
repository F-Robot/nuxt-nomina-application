<script setup lang="ts">
interface Emits {
  (e: 'submit'): void
  (e: 'update:role', role: string): void
  (e: 'update:name', name: string): void
  (e: 'update:number', number: string): void
}
interface Props {
  role: string
  name: string
  title: string
  button: string
  number: string
  loading: boolean
}
const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const emitSubmit = () => emits('submit')
const emitRole = (role: string) => emits('update:role', role)
const emitName = (name: string) => emits('update:name', name)
const emitNumber = (number: string) => emits('update:number', number)

const color = 'primary'

const radios = ref([
  { label: 'Chofer', value: 'Chofer' },
  { label: 'Cargador', value: 'Cargador' },
  { label: 'Auxiliar', value: 'Auxiliar' },
])
</script>

<template>
  <VCard class="mx-auto my-1" max-width="334">
    <VCardTitle class="text-primary">{{ title }}</VCardTitle>
    <VContainer>
      <VTextField
        :color="color"
        label="Numero"
        variant="outlined"
        :value="props.number"
        @input="emitNumber($event.target.value)"
      />
      <VTextField
        :color="color"
        label="Nombre"
        variant="outlined"
        :value="props.name"
        @input="emitName($event.target.value)"
      />
      <VRadioGroup
        inline
        label="Rol"
        :value="props.role"
        @input="emitRole($event.target.value)"
      >
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
      <VBtn
        :color="color"
        :loading="loading"
        :disabled="loading"
        @click="emitSubmit"
      >
        {{ button }}
        <VIcon icon="mdi-chevron-right" end />
      </VBtn>
    </VCardActions>
  </VCard>
</template>
