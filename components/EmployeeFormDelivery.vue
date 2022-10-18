<script setup lang="ts">
import { numberRules } from '~/utils/validations'
interface Emits {
  (e: 'submit'): void
  (e: 'update:delivery', delivery: string): void
}
interface Props {
  title: string
  button: string
  loading: boolean
  delivery: string
  deliveries: string | number
}
const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const emitSubmit = () => emits('submit')
const emitName = (delivery: string) => emits('update:delivery', delivery)

const color = 'primary'

const form = ref(null)
const isFormValid = ref(false)
defineExpose({ resetForm: () => form.value.reset() })
</script>

<template>
  <VCard class="mx-auto my-1" max-width="334">
    <VCardTitle class="text-primary">{{ title }}</VCardTitle>
    <VCardSubtitle class="text-primary">
      Envios actuales: {{ deliveries }}
    </VCardSubtitle>
    <VContainer>
      <VForm ref="form" v-model="isFormValid">
        <VTextField
          :color="color"
          label="Envios"
          variant="outlined"
          :rules="numberRules"
          :value="props.delivery"
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
