<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs'
import TheNavbar from '~/components/TheNavbar.vue'
import TheSidebar from '~/components/TheSidebar.vue'
const { mobile } = useDisplay()
</script>

<template>
  <VApp>
    <TheNavbar />
    <TheSidebar v-if="!mobile" />
    <VMain>
      <NuxtPage />
    </VMain>
  </VApp>
</template>

<style scoped>
.v-main {
  background-color: #f8fafb;
}
</style>
