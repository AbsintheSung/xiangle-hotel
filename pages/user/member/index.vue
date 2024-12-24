<script setup lang="ts">
import * as zod from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { taiwanCity } from "~/content/city";
import type { SignUpForm } from "~/types/auth";
const { $dayjs } = useNuxtApp();
const isEditAuth = ref<boolean>(false);
const isEditInfo = ref<boolean>(false);

const handlleEditAuth = (): void => {
  isEditAuth.value = true;
};
const handlleEditInfo = (): void => {
  isEditInfo.value = true;
};
const closeEditAuth = (): void => {
  isEditAuth.value = false;
  authFormReset();
};
const closeEditInfo = (): void => {
  isEditInfo.value = false;
  infoFormReset();
};

const signUpForm = ref<SignUpForm>({
  name: "",
  email: "",
  password: "",
  phone: "",
  birthday: "", //字串，格式為 yyyy/mm/dd
  address: {
    zipcode: null, //會傳入 number
    detail: "",
    city: "",
    county: "",
  },
});

//以下為 密碼 更改表單設定
// 模擬後端提供的舊密碼，用於驗證
const oldPasswordFromBackend = "oldPassword123";
const userFormSchema = zod
  .object({
    oldPassword: zod
      .string()
      .min(1, { message: "必填" })
      .refine((val) => val === oldPasswordFromBackend, {
        message: "舊密碼不正確",
      }),
    newPassword: zod
      .string()
      .min(8, { message: "至少需要 8 個字元含一個英文字母" })
      .regex(/[A-Za-z]/, { message: "必須包含至少一個英文字母" }),
    confirmNewPassword: zod.string().min(1, { message: "必填" }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["confirmNewPassword"],
        message: "新密碼與確認密碼不一致",
      });
    }
  });

// 使用 vee-validate 初始化表單
const { handleSubmit: saveAuth, resetForm: authFormReset } = useForm({
  validationSchema: toTypedSchema(userFormSchema),
  initialValues: {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  },
});

const { value: oldPassword, errorMessage: oldPasswordError } = useField("oldPassword");
const { value: newPassword, errorMessage: newPasswordError } = useField("newPassword");
const { value: confirmNewPassword, errorMessage: confirmPasswordError } = useField("confirmNewPassword");
const handleSaveAuth = saveAuth(
  (values) => {
    console.log("表單提交成功", values);
    // signUpForm.value.email = email.value as string;
    // signUpForm.value.password = password.value as string;
    // formState.value = "personalInfoForm";
    // resetForm();
  },
  (errors) => {
    console.log("表單驗證失敗", errors);
  }
);

//以下為 基本資料 更改表單設定
const memberInfoSchema = zod.object({
  name: zod.string().min(1, { message: "姓名為必填" }),
  phone: zod.string().refine((value) => {
    const taiwanPhoneRegex = /^09\d{8}$/;
    return taiwanPhoneRegex.test(value);
  }, "請輸入有效的台灣電話號碼"),
  year: zod.string().min(1, { message: "請選取正確日期" }),
  month: zod.string().min(1, { message: "請選取正確日期" }),
  day: zod.string().min(1, { message: "請選取正確日期" }),
  city: zod.string().min(1, { message: "請填入和選取正確地址" }),
  county: zod.string().min(1, { message: "請填入和選取正確地址" }),
  detailAddress: zod.string().min(1, { message: "請填入和選取正確地址" }),
});
const { handleSubmit: saveInfo, resetForm: infoFormReset } = useForm({
  validationSchema: toTypedSchema(memberInfoSchema),
  initialValues: {
    name: "",
    phone: "",
    year: "",
    month: "",
    day: "",
    city: "",
    county: "",
    detailAddress: "",
  },
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: phone, errorMessage: phoneError } = useField("phone");
const { value: year, errorMessage: yearError } = useField("year");
const { value: month, errorMessage: monthError } = useField("month");
const { value: day, errorMessage: dayError } = useField("day");
const { value: city, errorMessage: cityError } = useField("city");
const { value: county, errorMessage: countyError } = useField("county");
const { value: detailAddress, errorMessage: detailAddressError } = useField("detailAddress");
const handleSaveInfo = saveInfo(
  (values) => {
    console.log("表單提交成功", values);
    // signUpForm.value.email = email.value as string;
    // signUpForm.value.password = password.value as string;
    // formState.value = "personalInfoForm";
    // resetForm();
  },
  (errors) => {
    console.log("表單驗證失敗", errors);
  }
);

// 添加一個計算屬性來整合日期錯誤訊息
const dateErrorMessage = computed(() => {
  const hasError = [yearError.value, monthError.value, dayError.value].some((error) => error !== undefined);
  return hasError ? "請選取正確日期" : undefined;
});

// 添加一個計算屬性來整合地址錯誤訊息
const addressErrorMessage = computed(() => {
  const hasError = [cityError.value, countyError.value, detailAddressError.value].some((error) => error !== undefined);
  return hasError ? "請填入和選取正確地址" : undefined;
});

// 生成年選項
const yearOptions = computed(() => {
  const currentYear = $dayjs().year();
  const startYear = currentYear - 100;
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);
});

// 生成月份選項（1-12月）
const monthOptions = computed(() => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
});

// 根據選擇的年月生成對應的日期選項
const dayOptions = computed(() => {
  if (!year.value || !month.value) {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }

  const daysInMonth = $dayjs(`${year.value}-${month.value}-01`).daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
});

//處理城市地區
const cityOptions = computed(() => taiwanCity.map((city) => city.name));
const countyOptions = computed(() => {
  const cityData = taiwanCity.find((cityItem) => cityItem.name === city.value);
  return cityData ? cityData.districts : []; // 如果找不到城市，返回空陣列
});

// 監聽年月的變化，確保日期在合法範圍內
watch([year, month], ([newYear, newMonth], [oldYear, oldMonth]) => {
  if (newYear === "" && newMonth === "") return;

  // 如果年份或月份變化，重置日期
  if (newYear !== oldYear || newMonth !== oldMonth) {
    day.value = "";
  }

  // 確保日期在合法範圍內
  if (newYear && newMonth) {
    const daysInMonth = $dayjs(`${newYear}-${newMonth}-01`).daysInMonth();
    if (Number(day.value) > daysInMonth) {
      day.value = String(daysInMonth); // 限制日期到該月份最大天數
    }
  }
});

//當城市改變時候，初始化地區，確保城市地區一致
watch(
  () => city.value,
  (newCity) => {
    if (newCity === "") return;
    county.value = "";
  }
);
</script>
<template>
  <section class="container flex flex-col gap-x-10 gap-y-6 md:flex-row text-white">
    <div v-if="!isEditAuth" class="h-fit p-6 w-full text-black bg-white rounded-[20px] lg:p-10 md:w-5/12">
      <h2 class="mb-6 text-2xl font-bold md:mb-10">修改密碼</h2>
      <form class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">電子信箱</label>
          <input class="font-bold bg-white" type="email" disabled value="Jessica@exsample.com" />
        </div>
        <div class="relative flex flex-col gap-y-2">
          <label class="font-medium">密碼</label>
          <input class="font-bold bg-white" type="password" disabled value="123456789" />
          <button class="absolute font-bold text-primary-base top-1/2 right-0 -translate-y-1/2 underline" @click.prevent="handlleEditAuth">重設</button>
        </div>
      </form>
    </div>
    <div v-else class="h-fit p-6 w-full text-black bg-white rounded-[20px] lg:p-10 md:w-5/12">
      <h2 class="mb-6 text-2xl font-bold md:mb-10">修改帳號資料</h2>
      <form class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">電子信箱</label>
          <input class="font-bold bg-white" type="email" disabled value="Jessica@exsample.com" />
        </div>
        <div class="relative flex flex-col gap-y-2">
          <label class="font-medium">舊密碼</label>
          <input class="p-4 font-bold border rounded-lg" v-model="oldPassword" type="password" placeholder="請輸入舊密碼" />
          <Transition name="error-mes-anime">
            <span v-if="oldPasswordError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ oldPasswordError }}</span>
          </Transition>
        </div>
        <div class="relative flex flex-col gap-y-2">
          <label class="font-medium">新密碼</label>
          <input class="p-4 font-bold border rounded-lg" v-model="newPassword" type="password" placeholder="請輸入新密碼" />
          <Transition name="error-mes-anime">
            <span v-if="newPasswordError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ newPasswordError }}</span>
          </Transition>
        </div>
        <div class="relative flex flex-col gap-y-2">
          <label class="font-medium">確認密碼</label>
          <input class="p-4 font-bold border rounded-lg" v-model="confirmNewPassword" type="password" placeholder="請再輸入一次新密碼" />
          <Transition name="error-mes-anime">
            <span v-if="confirmPasswordError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ confirmPasswordError }}</span>
          </Transition>
        </div>
        <div class="flex gap-x-4">
          <button class="w-full py-4 px-6 primary-base font-bold rounded-lg border border-primary-base text-primary-base md:w-fit lg:px-8" @click.prevent="closeEditAuth">取消</button>
          <button class="w-full py-4 px-6 primary-base font-bold rounded-lg border border-primary-base text-primary-base md:w-fit lg:px-8" @click.prevent="handleSaveAuth">儲存設定</button>
        </div>
      </form>
    </div>
    <div v-if="!isEditInfo" class="h-fit p-6 w-full text-black bg-white rounded-[20px] lg:p-10 md:w-7/12">
      <h2 class="mb-6 text-2xl font-bold md:mb-10">基本資料</h2>
      <form class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">姓名</label>
          <input class="font-bold bg-white" type="email" disabled value="Jessica Ｗang" />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">手機號碼</label>
          <input class="font-bold bg-white" type="phone" disabled value="0932000000" />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">生日</label>
          <input class="font-bold bg-white" type="text" disabled value="1990 年 8 月 15 日" />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">地址</label>
          <input class="font-bold bg-white" type="text" disabled value="高雄市新興區六角路 123 號" />
        </div>
        <button class="py-4 px-8 w-fit primary-base font-bold rounded-lg border border-primary-base text-primary-base" @click.prevent="handlleEditInfo">編輯</button>
      </form>
    </div>
    <div v-else class="h-fit p-6 w-full text-black bg-white rounded-[20px] lg:p-10 md:w-7/12">
      <h2 class="mb-6 text-2xl font-bold md:mb-10">修改基本資料</h2>
      <form class="flex flex-col gap-y-6">
        <div class="relative w-full flex flex-col gap-y-2">
          <label class="font-bold">姓名</label>
          <input v-model="name" type="text" class="p-4 text-black font-bold border rounded-lg" placeholder="請輸入姓名" />
          <Transition name="error-mes-anime">
            <span v-if="nameError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ nameError }}</span>
          </Transition>
        </div>
        <div class="relative w-full flex flex-col gap-y-2">
          <label class="font-bold">手機號碼</label>
          <input v-model="phone" type="phone" class="p-4 text-black font-bold border rounded-lg" placeholder="請輸入手機號碼" />
          <Transition name="error-mes-anime">
            <span v-if="phoneError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ phoneError }}</span>
          </Transition>
        </div>
        <div class="w-full flex flex-col gap-y-2">
          <label class="font-bold">生日</label>
          <div class="relative w-full flex items-center gap-x-2">
            <div class="relative flex-1 w-full">
              <select v-model="year" class="appearance-none w-full p-4 text-black font-bold border rounded-lg bg-white cursor-pointer">
                <option disabled value="">年</option>
                <option v-for="y in yearOptions" :key="y" :value="String(y)">
                  {{ y }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
              </div>
            </div>
            <div class="relative flex-1 w-full">
              <select v-model="month" class="appearance-none w-full p-4 text-black font-bold border rounded-lg bg-white cursor-pointer">
                <option disabled value="">月</option>
                <option v-for="m in monthOptions" :key="m" :value="String(m)">
                  {{ m }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
              </div>
            </div>
            <div class="relative flex-1 w-full">
              <select v-model="day" class="appearance-none w-full p-4 text-black font-bold border rounded-lg bg-white cursor-pointer">
                <option disabled value="">日</option>
                <option v-for="d in dayOptions" :key="d" :value="String(d)">
                  {{ d }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
              </div>
            </div>
            <Transition name="error-mes-anime">
              <span v-if="dateErrorMessage !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">
                {{ dateErrorMessage }}
              </span>
            </Transition>
          </div>
        </div>
        <div class="relative w-full flex flex-col gap-y-2">
          <label class="font-bold">地址</label>
          <div class="relative flex items-center gap-x-2">
            <div class="relative flex-1 w-full">
              <select v-model="city" class="appearance-none w-full p-4 text-black font-bold border rounded-lg bg-white cursor-pointer">
                <option disabled value="">城市</option>
                <option v-for="cityItem in cityOptions" :key="cityItem" :value="cityItem">{{ cityItem }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
              </div>
            </div>
            <div class="relative flex-1 w-full">
              <select v-model="county" class="appearance-none w-full p-4 text-black font-bold border rounded-lg bg-white cursor-pointer">
                <option disabled value="">地區</option>
                <option v-for="countyItem in countyOptions" :key="countyItem.zip" :value="countyItem.name">{{ countyItem.name }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
              </div>
            </div>
          </div>
          <input v-model="detailAddress" type="text" class="p-4 text-black fond-bold border rounded-lg" placeholder="請輸入詳細地址" />
          <Transition name="error-mes-anime">
            <span v-if="addressErrorMessage !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">
              {{ addressErrorMessage }}
            </span>
          </Transition>
        </div>
        <div class="flex gap-x-4">
          <button class="w-full py-4 px-6 primary-base font-bold rounded-lg border border-primary-base text-primary-base md:w-fit lg:px-8" @click.prevent="closeEditInfo">取消</button>
          <button class="w-full py-4 px-6 primary-base font-bold rounded-lg border border-primary-base text-primary-base md:w-fit lg:px-8" @click.prevent="handleSaveInfo">儲存設定</button>
        </div>
      </form>
    </div>
  </section>
</template>
<style scoped lang="scss">
.error-mes-anime-enter-active,
.error-mes-anime-leave-active {
  transition: opacity 0.2s ease;
}

.error-mes-anime-enter-from,
.error-mes-anime-leave-to {
  opacity: 0;
}
</style>
