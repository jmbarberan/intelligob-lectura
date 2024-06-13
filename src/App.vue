<script setup>
</script>

<template>
  <div class="app-container" :class="authStore.user && 'bg-light'">
    <!--Nav /-->
    <!--Alert /-->
    <div class="container pt-4 pb-4">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 20em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;  
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
