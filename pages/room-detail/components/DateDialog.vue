<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from "@headlessui/vue";
type DateRange = {
  start: string;
  end: string;
};
const dateRange = defineModel<DateRange>("dateRange", { required: true });
defineProps<{
  isDateOpen: boolean;
  windowWidthSize: number;
  calendarKey: number;
  // dateRange: { start: string; end: string };
  formattedDateRange: string;
  masks: { title: string; modelValue: string };
  minDate: Date;
  maxDate: Date;
  totalNights: number;
  VDatePickerCol: number;
  VDatePickerRow: number;
  closeDateModal: () => void;
  openDateModal: () => void;
  checkDate: () => void;
  clearDate: () => void;
}>();
</script>

<template>
  <TransitionRoot appear :show="isDateOpen" as="template">
    <Dialog as="div" @close="closeDateModal" class="relative z-50" :open="isDateOpen">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex w-full min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="p-6 w-full flex flex-col gap-y-10 rounded-2xl bg-white shadow-xl transform overflow-hidden transition-all md:w-2xl md:max-w-2xl">
              <template v-if="windowWidthSize > 768" #default>
                <div class="hidden items-center justify-between md:flex">
                  <div class="flex flex-col gap-y-2">
                    <p class="text-2xl text-start font-bold">{{ totalNights }}晚</p>
                    <p class="font-medium">{{ formattedDateRange }}</p>
                  </div>
                  <div class="flex items-center gap-x-2 font-medium">
                    <div class="w-44 p-4 flex flex-col gap-y-2 border boprder-black rounded-lg">
                      <p class="text-[12px] text-start">入住</p>
                      <p class="text-start">{{ dateRange.start }}</p>
                    </div>
                    <div class="w-44 p-4 flex flex-col gap-y-2 border boprder-black rounded-lg">
                      <p class="text-[12px] text-start">退房</p>
                      <p class="text-start">{{ dateRange.end }}</p>
                    </div>
                  </div>
                </div>
                <VDatePicker v-model.range="dateRange" :key="calendarKey" :masks="masks" :columns="VDatePickerCol" :rows="VDatePickerRow" :min-date="minDate" :max-date="maxDate" expanded />
                <div class="w-full flex items-center justify-end gap-x-4 font-bold text-base">
                  <button class="px-8 py-4 rounded-lg" @click="clearDate">清除日期</button>
                  <button class="px-8 py-4 bg-primary-base text-white rounded-lg" @click="checkDate">確定日期</button>
                </div>
              </template>
              <template v-else #default>
                <div class="flex flex-col gap-y-2">
                  <div class="flex items-center justify-start">
                    <button class="flex items-center justify-center" @click="closeDateModal">
                      <Icon class="text-3xl border-none" name="fluent:dismiss-24-filled" />
                    </button>
                  </div>
                  <div>
                    <p v-if="totalNights === 0" class="text-xl font-bold text-start">選擇入住與退房日期</p>
                    <p v-else class="flex gap-x-3 items-center">
                      <span class="text-xl font-bold">{{ totalNights }}晚</span>
                      <span>{{ formattedDateRange }}</span>
                    </p>
                  </div>
                </div>
                <VDatePicker v-model.range="dateRange" :key="calendarKey" :masks="masks" :columns="VDatePickerCol" :rows="VDatePickerRow" :min-date="minDate" :max-date="maxDate" expanded />
                <div class="w-full flex items-center justify-end gap-x-4 font-bold text-base">
                  <button class="px-8 py-4 rounded-lg" @click="clearDate">清除日期</button>
                  <button class="px-8 py-4 bg-primary-base text-white rounded-lg" @click="checkDate">確定日期</button>
                </div>
              </template>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
