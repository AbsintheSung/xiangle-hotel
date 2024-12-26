<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from "@headlessui/vue";

defineProps<{
  isOpenConfirm: boolean;
  // VDatePickerCol: number;
  // VDatePickerRow: number;
  closeConfirmModal: () => void;
  // openConfirmModal: () => void;
  // reduceGuests: () => void;
  // addGuests: () => void;
  // reSelectDate: () => void;
}>();
</script>
<template>
  <TransitionRoot class="md:hidden" appear :show="isOpenConfirm" as="template">
    <Dialog as="div" @close="closeConfirmModal" class="relative z-50" :open="isOpenConfirm">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>
      <div class="w-full fixed bottom-0 overflow-y-auto">
        <div class="flex w-full min-h-full items-center justify-center text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="py-4 w-full flex flex-col gap-y-10 rounded-2xl bg-white shadow-xl transform overflow-hidden transition-all md:w-2xl md:max-w-2xl"></DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped lang="scss"></style>
