<template>
  <app-sidebar />
  <app-header :title="$route.meta.title"/>
  <main class="main-content">
    <Transition>
      <router-view />
    </Transition>
  </main>
  <app-footer />
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import AppSidebar from './components/layout/AppSidebar.vue';
import AppFooter from './components/layout/AppFooter.vue';
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
