<script setup lang="ts">
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
</script>

<template>
  <VCard class="mx-auto my-1" max-width="334">
    <VCardTitle class="text-primary">{{ title }}</VCardTitle>
    <VCardSubtitle class="text-primary">
      Envios actuales: {{ deliveries }}
    </VCardSubtitle>
    <VContainer>
      <VTextField
        :color="color"
        label="Envios"
        variant="outlined"
        :value="props.delivery"
        @input="emitName($event.target.value)"
      />
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
