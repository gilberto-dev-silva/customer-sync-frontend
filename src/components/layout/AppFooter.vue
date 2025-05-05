<template>
  <footer class="app-footer">
      <div class="footer-copyright">
        <p>&copy; {{ currentYear }} CustomerSync. Todos os direitos reservados.</p>
      </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>
