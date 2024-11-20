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
  customClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <svg :class="customClass">
    <use :href="`${svgSrc}#${svgId}`"></use>
  </svg>
</template>

<style scoped></style>
