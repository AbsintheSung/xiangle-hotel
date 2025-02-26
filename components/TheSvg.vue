<script setup lang="ts">
defineProps({
  svgSrc: {
    type: String,
    default: "",
  },
  svgId: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "none", // 使用 CSS 的颜色
  },
});
</script>

<template>
  <svg :style="{ fill: color }">
    <use :href="`${svgSrc}#${svgId}`"></use>
  </svg>
</template>

<style scoped></style>
