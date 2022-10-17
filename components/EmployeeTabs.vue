<script setup lang="ts">
const tabs = ['Listar empleado', 'Editar empleado', 'Agregar empleado']
</script>
<template>
  <v-tabs v-model="tabModel" fixed-tabs>
    <v-tab
      v-for="tab in tabs"
      :key="tab.value"
      class="mx-auto"
      color="primary"
      :value="tab.value"
    >
      {{ tab.text }}
    </v-tab>
  </v-tabs>
</template>
