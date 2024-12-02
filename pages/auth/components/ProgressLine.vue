<script setup lang="ts">
defineProps({
  formState: {
    type: String,
    default: "emailPasswordForm",
  },
  isFormValidated: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="w-full flex justify-between items-center gap-x-2 sm:w-2/3 4xl:w-1/2">
    <!-- Step 1 -->
    <div class="flex flex-col items-center gap-y-1">
      <div :class="['w-8 h-8 flex items-center justify-center rounded-full', formState === 'emailPasswordForm' || formState === 'personalInfoForm' ? 'bg-primary-base' : 'border border-white']">
        <p v-if="formState === 'emailPasswordForm'" class="text-white">1</p>
        <Icon v-else-if="formState === 'personalInfoForm'" name="ic:baseline-check" class="text-white" />
      </div>
      <p class="font-bold text-white">輸入信箱及密碼</p>
    </div>

    <div class="flex-1 h-[2px] bg-[#ECECEC]"></div>

    <!-- Step 2 -->
    <div class="flex flex-col items-center gap-y-1">
      <div :class="['w-8 h-8 flex items-center justify-center rounded-full', formState === 'personalInfoForm' ? 'bg-primary-base' : 'border border-white']">
        <p v-if="!isFormValidated" class="text-white">2</p>
        <Icon v-else name="ic:baseline-check" class="text-white" />
      </div>
      <p class="font-bold text-white">填寫基本資料</p>
    </div>
  </div>
</template>
<style scoped></style>
