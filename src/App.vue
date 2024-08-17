<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss">
.blueLayer {
  filter: grayscale(90%) sepia(10%) invert(77%) saturate(500%);
  //hue-rotate(180deg);
  //filter: grayscale(80%);
}
</style>
