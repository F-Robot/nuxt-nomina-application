import { createVuetify } from 'vuetify'
import { mdi } from 'vuetify/lib/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
