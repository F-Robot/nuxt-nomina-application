<script setup lang="ts">
import { numberRules } from '~/utils/validations'
interface Emits {
  (e: 'submit'): void
  (e: 'update:months', delivery: string): void
}
interface Props {
  title: string
  button: string
  months: string
  loading: boolean
}
const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const emitSubmit = () => emits('submit')
const emitName = (delivery: string) => emits('update:months', delivery)

const color = 'primary'

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
          :color="color"
          label="Meses"
          variant="outlined"
          :rules="numberRules"
          :value="props.months"
          @input="emitName($event.target.value)"
        />
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
