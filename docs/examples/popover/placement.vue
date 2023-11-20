<script lang="tsx" setup>
</script>

<template>
  <div class="w-full" :style="{ position: 'relative', height: '280px' }">
    <hi-popover :style="{ position: 'absolute', top: '0', left: '70px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="top-left">
      <button>
        Top-Left
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '0', left: '180px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="top">
      <button>
        TOP
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '0', left: '290px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="top-right">
      <button>
        Top-Right
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '240px', left: '70px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="bottom-left">
      <button>
        Bottom-Left
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '240px', left: '180px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="bottom">
      <button>
        BOTTOM
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '240px', left: '290px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="bottom-right">
      <button>
        Bottom-Right
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '60px', left: '10px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="left-top">
      <button>
        Left-Top
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '120px', left: '10px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="left">
      <button>
        LEFT
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '180px', left: '10px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="left-bottom">
      <button>
        Left-Bottom
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '60px', left: '350px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="right-top">
      <button>
        Right-Top
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '120px', left: '350px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="right">
      <button>
        RIGHT
      </button>
      <template #popup>
        <div class="bg-white rounded shadow-md px-2 py-3">
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </div>
      </template>
    </hi-popover>
    <hi-popover :style="{ position: 'absolute', top: '180px', left: '350px' }" class="button b-1 b-gray-1 bg-gray-1 b-solid rounded-md px-2 py-1" placement="right-bottom">
      <button>
        Right-Bottom
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
