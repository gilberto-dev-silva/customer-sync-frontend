<template>
  <aside class="app-sidebar" :class="{ 'collapsed': !sidebarOpen }">
    <AppHeaderSidebar />
    <nav>
      <ul class="nav">
        <li
          class="nav-item"
          v-for="item in menuItems"
            :key="item.to"
            @mouseenter="showTooltip = sidebarOpen ? null : item.text"
            @mouseleave="showTooltip = null"
        >
          <router-link
            :to="item.to"
            class="nav-link"
            active-class="active"
          >
            <i :class="item.icon"></i>
            <span class="nav-text">{{ item.text }}</span>
          </router-link>
          <div class="tooltip" v-if="showTooltip === item.text">
            {{ item.text }}
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useUIStore } from '../../stores/ui'
import AppHeaderSidebar from './AppHeaderSidebar.vue'

const uiStore = useUIStore()
const sidebarOpen = computed(() => uiStore.sidebarOpen)
const showTooltip = ref<string | null>(null)

const menuItems = [
  { to: '/', icon: 'fa-solid fa-house', text: 'Dashboard' },
  { to: '/clientes', icon: 'fa-solid fa-users', text: 'Clientes' },
]
</script>
