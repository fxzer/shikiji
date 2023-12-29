<script setup lang="ts">
import DualThemeClass from './components/DualThemeClass.vue'

import DualThemePrefers from './components/DualThemePrefers.vue'
</script>

<template>
  <Suspense>
    <div>
      <DualThemeClass />
      <DualThemePrefers />
    </div>
  </Suspense>
</template>

<style>

</style>
