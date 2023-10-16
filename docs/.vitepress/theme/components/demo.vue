<script lang="tsx">
export default {
  name: "DemoBlock",
  props: {
    customClass: String
  }
};
</script>

<template>
  <div class="demoblock" :class="[customClass ? customClass : '']">
    <div class="demoblock-view">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.demoblock {
  margin: 10px 0;
}
.demoblock .demoblock-view {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 24px;
  transition: .2s;
}
</style>
