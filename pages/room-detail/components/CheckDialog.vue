<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from "@headlessui/vue";
type DateRange = {
  start: string;
  end: string;
};
const dateRange = defineModel<DateRange>("dateRange", { required: true });
defineProps<{
  isOpenConfirm: boolean;
  totalGuests: number;
  // windowWidthSize: number;
  // dateRange: { start: string; end: string };
  // masks: { title: string; modelValue: string };
  // minDate: Date;
  // maxDate: Date;
  totalNights: number;
  // VDatePickerCol: number;
  // VDatePickerRow: number;
  closeConfirmModal: () => void;
  openConfirmModal: () => void;
  minGuests: () => void;
  addGuests: () => void;
}>();
</script>
<template>
  <TransitionRoot class="md:hidden" appear :show="isOpenConfirm" as="template">
    <Dialog as="div" @close="closeConfirmModal" class="relative z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>
      <div class="w-full fixed bottom-0 overflow-y-auto">
        <div class="flex w-full min-h-full items-center justify-center text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="py-4 w-full flex flex-col gap-y-10 rounded-2xl bg-white shadow-xl transform overflow-hidden transition-all md:w-2xl md:max-w-2xl">
              <div class="-mt-4 px-6 py-2 flex flex-col gap-y-4 bg-neutral-300">
                <button class="self-start flex items-center justify-center">
                  <Icon class="text-3xl border-none" name="fluent:dismiss-24-filled" />
                </button>
                <div class="flex items-center gap-x-2">
                  <p class="text-2xl text-start font-bold">{{ totalNights }}晚</p>
                  <p class="font-medium">{{ dateRange.start }} - {{ dateRange.end }}</p>
                </div>
              </div>
              <div class="px-6 flex flex-col gap-y-4">
                <p class="text-start font-bold text-xl">選擇人數</p>
                <p class="text-start font-medium">此房型最多供 4 人居住，不接受寵物入住。</p>
                <div class="flex items-center gap-x-4">
                  <button class="p-4 flex items-center justify-center border border-neutral-200 rounded-full" @click="minGuests">
                    <Icon name="fluent:minimize-24-regular" />
                  </button>
                  <p class="px-1">{{totalGuests}}</p>
                  <button class="p-4 flex items-center justify-center border border-neutral-200 rounded-full" @click="addGuests">
                    <Icon name="fluent:add-24-filled" />
                  </button>
                </div>
              </div>
              <div class="px-6 font-bold flex items-center gap-x-4">
                <button class="flex-1 py-4 rounded-lg">重新選擇日期</button>
                <button class="flex-1 py-4 text-white bg-primary-base rounded-lg" @click="closeConfirmModal">儲存</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped lang="scss"></style>
