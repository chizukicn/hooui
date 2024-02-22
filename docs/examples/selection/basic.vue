<script lang="ts" setup>
import { ref } from "vue";

const activeNum = ref(1);
</script>

<template>
  <div>
    <hi-selection
      v-model="activeNum"
      active-class="bg-blue-3 text-white b-blue-3"
      item-class="py-1 px-2 rounded cursor-pointer b-1 b-solid duration-300"
      unactive-class="b-gray-3"
      disabled-class="b-gray-3 text-gray-3 cursor-not-allowed"
      class="space-x-3 flex items-center"
    >
      <hi-item :value="1">
        Item 1
      </hi-item>
      <hi-item :value="2">
        Item 2
      </hi-item>
      <hi-item :value="3">
        Item 3
      </hi-item>
      <hi-item disabled :value="4">
        Disbaled
      </hi-item>
    </hi-selection>
    <div class="mt-3">
      Now activated: Item {{ activeNum }}
    </div>
  </div>
</template>
