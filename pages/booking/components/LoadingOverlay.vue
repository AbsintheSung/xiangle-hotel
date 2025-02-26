<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>
<template>
  <Transition enter-active-class="transition-opacity duration-200 ease-in-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in-out" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isLoading" class="px-4 fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div class="w-full h-[536px] flex items-center justify-center bg-white rounded-2xl max-w-[1020px] lg:h-[800px]">
        <div class="flex flex-col items-center space-y-10">
          <div class="flex space-x-2">
            <div
              v-for="i in 3"
              :key="i"
              class="h-2 w-2 rounded-full bg-gray-800 custom-bounce"
              :style="{
                animationDelay: `${(i - 1) * 0.5}s`,
              }"
            />
          </div>
          <div class="flex flex-col gap-y-4 text-center">
            <div class="text-gray-400 text-sm">
              <TheSvgIcon class="w-[196px] h-[72px]" name="logo-primary"></TheSvgIcon>
            </div>
            <div class="text-gray-800 text-base font-medium">
              <p class="font-bold md:text-2xl">正在處理你的預定</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.custom-bounce {
  animation: custom-bounce 1s ease-in-out infinite;
}

@keyframes custom-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
