<script lang="ts" setup>
// import PasswordChangeForm from "~/components/PaswordChangeForm.vue";
import themeConfig from '~/config/theme'

const { dense } = themeConfig

const margin = computed(() => {
  return dense ? 10 : 24
})
function calculatePageHeight(offset: number) {
  return {
    minHeight: offset ? `calc(100vh - ${margin.value + offset}px)` : '100vh',
  }
}
/* const variablesStore = useVariablesStore()
const authStore = useAuthStore()

const passwordChangeFormRef = ref<InstanceType<
  typeof PasswordChangeForm
> | null>(null)

function showPasswordChangeForm() {
  passwordChangeFormRef.value?.open()
} */
</script>

<template>
  <q-layout view="lhh LpR lff">
    <q-header bordered bg-white class="text-gray">
      <div w-full flex>
        <q-toolbar>
          <q-toolbar-title><!-- {{ variablesStore.pageTitle }} -->ss</q-toolbar-title>
          <q-space />
          <div mr-4 flex items-center>
            <p mb-0 text-14px text-gray-700>
              <!-- {{
                `${authStore.getUserInfo?.practice_month?.month_humanize} ${authStore.getUserInfo?.practice_month?.year}
              (${authStore.getUserInfo?.practice_day?.date})`
              }} -->
            </p>
          </div>
          <!--  <account-menu @show-password-form="showPasswordChangeForm" /> -->
        </q-toolbar>
      </div>
    </q-header>

    <sidebar />
    <q-page-container bg-gray-100>
      <q-page

        :style-fn="calculatePageHeight"
        :class="dense ? 'm-10px' : 'm-24px'"
        mb-0 rounded-4px bg-white
      >
        <router-view #="{ Component, route }">
          <transition name="fade" mode="out-in">
            <div :key="route.name || 'fallback-route-name'">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
