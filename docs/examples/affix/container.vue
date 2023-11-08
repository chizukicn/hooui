<script lang="ts" setup>
</script>

<template>
  <div class="space-y-3 affix-container h-90 of-y-auto w-full">
    <hi-affix :offset="30" target=".affix-container">
      <div class="px-6 text-white inline-flex border-box justify-center py-2 bg-blue-3 rounded-3">
        Offset top 30px with container
      </div>
    </hi-affix>
    <div class="w-full h-150 flex items-end">
      This is a container with 150px height
    </div>
  </div>
</template>
