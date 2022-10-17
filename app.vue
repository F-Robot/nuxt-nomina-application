<script setup lang="ts">
import TheNavbar from '~/components/TheNavbar.vue'
import TheSidebar from '~/components/TheSidebar.vue'
</script>

<template>
  <VApp>
    <TheNavbar />
    <TheSidebar />
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
