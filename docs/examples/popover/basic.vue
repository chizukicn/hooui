<script lang="ts" setup>
</script>

<template>
  <div class="w-full flex space-x-3">
    <hi-popover trigger-event="click">
      <button class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1">
        Click
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="dblclick">
      <button class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1">
        Double Click
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="mousedown">
      <button class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1">
        Mouse Down
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="hover">
      <button class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1">
        Hover
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="contextmenu">
      <button class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1">
        ContextMenu
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="touch" class="">
      <button class="button focus:b-blue-1 b-1 b-solid b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1">
        Touch
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover trigger-event="focus" class="">
      <button class="button focus:b-blue-1 b-1 b-solid b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1">
        Focus
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
  </div>
</template>
