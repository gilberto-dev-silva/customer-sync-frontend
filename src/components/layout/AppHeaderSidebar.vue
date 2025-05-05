<template>
  <header class="app-header-sidebar bg-primary text-white shadow-sm">
    <div class="container-fluid d-flex align-items-center justify-content-center py-2">
      <button class="btn btn-lg" @click="toggleSidebar">
        <i class="fa-solid fa-bars"></i>
      </button>
      <h1>Customer Sync</h1>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useUIStore } from '../../stores/ui'

const uiStore = useUIStore()

const toggleSidebar = () => {
  uiStore.toggleSidebar()
}
</script>
