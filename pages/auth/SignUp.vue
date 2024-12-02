<script setup lang="ts">
import * as zod from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { taiwanCity } from "~/content/city";
import type { SignUpForm } from "~/types/auth";
import ProgressLine from "./components/ProgressLine.vue";
//emailPasswordForm 跟  personalInfoForm 2個狀態表單
const formState = ref("emailPasswordForm");
const isFormValidated = ref(false);
const { $dayjs } = useNuxtApp();
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

// 定義表單驗證 Schema
const userFormSchema = zod
  .object({
    email: zod.string().email({ message: "請輸入有效的電子郵件地址" }),
    password: zod
      .string()
      .min(6, { message: "至少需要 6 個字元且含一個英文字母" })
      .regex(/[A-Za-z]/, { message: "必須包含至少一個英文字母" }),
    confirmPassword: zod.string().min(1, { message: "必填" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "密碼與確認密碼不一致",
      });
    }
  });

// 使用 vee-validate 初始化表單
const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(userFormSchema),
  initialValues: {
    email: "",
    password: "",
    confirmPassword: "",
  },
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField("confirmPassword");

// 處理表單提交
const handleSetup = handleSubmit(
  (values) => {
    console.log("表單提交成功", values);
    signUpForm.value.email = email.value as string;
    signUpForm.value.password = password.value as string;
    formState.value = "personalInfoForm";
    resetForm();
  },
  (errors) => {
    console.log("表單驗證失敗", errors);
  }
);

//另一個表單驗證
const personalInfoSchema = zod.object({
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
  agreeToTerms: zod.boolean().refine((value) => value === true, {
    message: "必須同意條款才能註冊",
  }),
});
const { handleSubmit: handlePersonForm, resetForm: resetPersonForm } = useForm({
  validationSchema: toTypedSchema(personalInfoSchema),
  initialValues: {
    name: "",
    phone: "",
    year: "",
    month: "",
    day: "",
    city: "",
    county: "",
    detailAddress: "",
    agreeToTerms: false,
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
const { value: agreeToTerms, errorMessage: agreeToTermsError } = useField("agreeToTerms");

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

const handleSignUp = handlePersonForm(
  (values) => {
    console.log("表單提交成功", values);
    const cityData = taiwanCity.find((cityItem) => cityItem.name === city.value);
    const districtsData = cityData?.districts.find((districtItem) => districtItem.name === county.value);
    const birthday: string = `${year.value}/${month.value}/${day.value}`;
    const zipcode: number = Number(districtsData?.zip);

    signUpForm.value.name = name.value as string;
    signUpForm.value.phone = phone.value as string;
    signUpForm.value.birthday = birthday;
    signUpForm.value.address.city = city.value as string;
    signUpForm.value.address.county = county.value as string;
    signUpForm.value.address.detail = detailAddress.value as string;
    signUpForm.value.address.zipcode = zipcode;

    resetPersonForm();
    // console.log(signUpForm.value);
  },
  (errors) => {
    console.log("表單驗證失敗", errors);
  }
);

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

//處理城市地區
const cityOptions = computed(() => taiwanCity.map((city) => city.name));
const countyOptions = computed(() => {
  const cityData = taiwanCity.find((cityItem) => cityItem.name === city.value);
  return cityData ? cityData.districts : []; // 如果找不到城市，返回空陣列
});

//當城市改變時候，初始化地區，確保城市地區一致
watch(
  () => city.value,
  (newCity) => {
    if (newCity === "") return;
    county.value = "";
  }
);

//使用 auth 的 layouts布局
definePageMeta({
  layout: "auth",
});
</script>
<template>
  <main class="bg-black h-screen">
    <div class="flex items-center h-full gap-x-11">
      <div class="hidden flex-1 h-full xl:flex xl:items-stretch">
        <img class="w-full" src="@/assets/images/desktop/login-hero.png" alt="登入大圖" />
      </div>
      <div class="px-3 mx-auto h-full flex-1 flex flex-col items-center justify-center gap-y-10">
        <div class="w-full flex flex-col justify-start items-center gap-y-2 sm:w-2/3 4xl:w-1/2">
          <h2 class="w-full font-bold text-start text-primary-base">享樂酒店，誠摯歡迎</h2>
          <p class="w-full text-3xl text-start font-bold text-white sm:text-4xl md:text-5xl">立即註冊</p>
        </div>

        <!-- 進度條狀態 -->
        <ProgressLine :formState="formState" :isFormValidated="isFormValidated" />

        <form @submit.prevent="handleSetup" v-if="formState === 'emailPasswordForm'" class="w-full flex flex-col items-center gap-y-4 text-white sm:w-2/3 4xl:w-1/2">
          <div class="relative w-full flex flex-col gap-y-2">
            <label class="font-bold">電子信箱</label>
            <input v-model="email" type="email" class="p-4 text-black font-bold rounded-lg" placeholder="hello@exsample.com" />
            <Transition name="error-mes-anime">
              <span v-if="emailError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ emailError }}</span>
            </Transition>
          </div>
          <div class="relative w-full flex flex-col gap-y-2">
            <label class="font-bold">密碼</label>
            <input v-model="password" type="password" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入密碼" />
            <Transition name="error-mes-anime">
              <span v-if="passwordError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ passwordError }}</span>
            </Transition>
          </div>
          <div class="relative w-full flex flex-col gap-y-2">
            <label class="font-bold">確認密碼</label>
            <input v-model="confirmPassword" type="password" class="p-4 text-black font-bold rounded-lg" placeholder="請再輸入同一次密碼" />
            <Transition name="error-mes-anime">
              <span v-if="confirmPasswordError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ confirmPasswordError }}</span>
            </Transition>
          </div>
          <div class="w-full mt-6">
            <button type="submit" class="w-full py-4 bg-primary-base font-bold rounded-lg">下一步</button>
          </div>
        </form>

        <form v-else-if="formState === 'personalInfoForm'" class="w-full flex flex-col items-center gap-y-4 text-white sm:w-2/3 4xl:w-1/2">
          <div class="relative w-full flex flex-col gap-y-2">
            <label class="font-bold">姓名</label>
            <input v-model="name" type="text" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入姓名" />
            <Transition name="error-mes-anime">
              <span v-if="nameError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ nameError }}</span>
            </Transition>
          </div>
          <div class="relative w-full flex flex-col gap-y-2">
            <label class="font-bold">手機號碼</label>
            <input v-model="phone" type="phone" class="p-4 text-black font-bold rounded-lg" placeholder="請輸入手機號碼" />
            <Transition name="error-mes-anime">
              <span v-if="phoneError !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">{{ phoneError }}</span>
            </Transition>
          </div>
          <div class="w-full flex flex-col gap-y-2">
            <label class="font-bold">生日</label>
            <div class="relative w-full flex items-center gap-x-2">
              <div class="relative flex-1 w-full">
                <select v-model="year" class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">年</option>
                  <!-- <option>2000</option>
                  <option>2001</option>
                  <option>2002</option> -->
                  <option v-for="y in yearOptions" :key="y" :value="String(y)">
                    {{ y }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
              <div class="relative flex-1 w-full">
                <select v-model="month" class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">月</option>
                  <!-- <option>1</option>
                  <option>2</option>
                  <option>3</option> -->
                  <option v-for="m in monthOptions" :key="m" :value="String(m)">
                    {{ m }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
              <div class="relative flex-1 w-full">
                <select v-model="day" class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">日</option>
                  <!-- <option>1</option>
                  <option>2</option>
                  <option>3</option> -->
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
                <select v-model="city" class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">城市</option>
                  <option v-for="cityItem in cityOptions" :key="cityItem" :value="cityItem">{{ cityItem }}</option>
                  <!-- <option>台北市</option>
                  <option>台中市</option>
                  <option>高雄市</option> -->
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
              <div class="relative flex-1 w-full">
                <select v-model="county" class="appearance-none w-full p-4 text-black font-bold rounded-lg bg-white cursor-pointer">
                  <option disabled value="">地區</option>
                  <option v-for="countyItem in countyOptions" :key="countyItem.zip" :value="countyItem.name">{{ countyItem.name }}</option>
                  <!-- <option>1</option>
                  <option>2</option>
                  <option>3</option> -->
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Icon class="text-2xl text-black" name="ic:baseline-keyboard-arrow-down"></Icon>
                </div>
              </div>
            </div>
            <input v-model="detailAddress" type="text" class="p-4 text-black fond-bold rounded-lg" placeholder="請輸入詳細地址" />
            <Transition name="error-mes-anime">
              <span v-if="addressErrorMessage !== undefined" class="absolute right-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">
                {{ addressErrorMessage }}
              </span>
            </Transition>
          </div>

          <div class="relative w-full flex justify-start items-end gap-2 text-neutral-0">
            <input v-model="agreeToTerms" id="signup-terms" type="checkbox" class="terms-checkbox" />
            <label for="signup-terms" class="font-bold text-white cursor-pointer">已同意本網站個資使用規範</label>
            <NuxtLink to="/auth/signup" class="hover:underline">規範條款</NuxtLink>
            <Transition name="error-mes-anime">
              <span v-if="agreeToTermsError !== undefined" class="absolute left-0 bottom-0 font-bold text-[16px] text-alert-base translate-y-6">
                {{ agreeToTermsError }}
              </span>
            </Transition>
          </div>

          <div class="w-full mt-6">
            <button class="w-full py-4 bg-primary-base font-bold rounded-lg" @click.prevent="handleSignUp">完成註冊</button>
          </div>
        </form>

        <div class="w-full flex justify-start items-center gap-x-2 font-medium sm:w-2/3 4xl:w-1/2">
          <p class="text-white">已經有會員了嗎?</p>
          <NuxtLink to="/auth/signin" class="font-bold text-primary-base hover:underline">立即登入</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.terms-checkbox {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  appearance: none;
  background-color: white;
  border-radius: 4px;
  &:checked {
    background-color: $primary-100;
    border-color: $primary-100;
    &::after {
      content: "";
      position: absolute;
      left: 8px;
      top: 4px;
      height: 14px;
      width: 8px;
      border-right: 2px solid white;
      border-bottom: 2px solid white;
      transform: rotate(45deg);
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(191, 157, 125, 0.2); // #BF9D7D with opacity
  }
}
.error-mes-anime-enter-active,
.error-mes-anime-leave-active {
  transition: opacity 0.2s ease;
}

.error-mes-anime-enter-from,
.error-mes-anime-leave-to {
  opacity: 0;
}
</style>
