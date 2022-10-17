<template>
  <div>
    <VNavigationDrawer elevation="0" color="white" permanent>
      <v-list>
        <v-list-item
          prepend-icon="mdi-account-tie"
          title="Empleados"
          value="empleados"
          color="primary"
        />
      </v-list>
    </VNavigationDrawer>
  </div>
</template>
<style scoped>
.v-navigation-drawer {
  border-right: 1px solid #e8e8e8;
}
</style>
