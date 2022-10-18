<script setup lang="ts">
import { nameRules, numberRules, radioRules } from '~/utils/validations'
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

const form = ref(null)
const isFormValid = ref(false)
defineExpose({ resetForm: () => form.value.reset() })
</script>

<template>
  <VCard class="mx-auto my-1" max-width="334">
    <VCardTitle class="text-primary">{{ title }}</VCardTitle>
    <VContainer>
      <VForm ref="form" v-model="isFormValid">
        <VTextField
          label="Numero"
          :color="color"
          :rules="numberRules"
          variant="outlined"
          :value="props.number"
          @input="emitNumber($event.target.value)"
        />
        <VTextField
          class="mt-2"
          :color="color"
          label="Nombre"
          :rules="nameRules"
          variant="outlined"
          :value="props.name"
          @input="emitName($event.target.value)"
        />
        <VRadioGroup
          inline
          class="mt-2"
          label="Rol"
          :rules="radioRules"
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
      </VForm>
    </VContainer>
    <VDivider />
    <VCardActions>
      <VSpacer />
      <VBtn
        :color="color"
        :loading="loading"
        :disabled="!isFormValid"
        @click="emitSubmit"
      >
        {{ button }}
        <VIcon icon="mdi-chevron-right" end />
      </VBtn>
    </VCardActions>
  </VCard>
</template>
