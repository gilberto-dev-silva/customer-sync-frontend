<template>
  <header class="app-header-main bg-primary text-white shadow-sm">
    <div class="conatiner-header-main">
      <h1>{{ props.title }}</h1>
    </div>
  </header>
</template>

<script lang="ts" setup>
interface TypeProps {
  title: string
}
const props = defineProps<TypeProps>()
</script>
