<script setup lang="tsx">
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'

const { availableLocales } = useI18n()
const languages = ref(['en'])
const appVersion = ref('Unknown')

onMounted((): void => {
  languages.value = availableLocales

  // Get application version from package.json version string (Using IPC communication)
  getApplicationVersionFromMainProcess()
})

const getApplicationVersionFromMainProcess = (): void => {
  window.mainApi.invoke('msgRequestGetVersion').then((result: string) => {
    appVersion.value = result
  })
}

</script>

<template>
  <v-container>
    aaa
  </v-container>
</template>
