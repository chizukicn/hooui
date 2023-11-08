<script lang="ts" setup>
</script>

<template>
  <div class="space-y-3">
    <hi-affix :offset="30" position="top">
      <div class="px-6 text-white inline-flex border-box justify-center py-2 bg-blue-3 rounded-3">
        Offset top 30px
      </div>
    </hi-affix>
    <hi-affix :offset="30" position="bottom">
      <div class="px-6 text-white inline-flex border-box justify-center py-2 bg-blue-3 rounded-3">
        Offset bottom 30px
      </div>
    </hi-affix>
  </div>
</template>
