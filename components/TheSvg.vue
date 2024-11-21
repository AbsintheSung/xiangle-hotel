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
});
</script>

<template>
  <svg>
    <use :href="`${svgSrc}#${svgId}`"></use>
  </svg>
</template>

<style scoped></style>
