<script setup lang="ts">
import * as zod from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { taiwanCity } from "~/content/city";
import type { SignUpForm } from "~/types/auth";
import type { Member, PutAuthResponse } from "~/types/user";
const { $swal } = useNuxtApp();
const config = useRuntimeConfig();
const router = useRouter();
const authStore = useAuthStore();
const { $dayjs } = useNuxtApp();
const isEditAuth = ref<boolean>(false);
const isEditInfo = ref<boolean>(false);

const getUserName = computed(() => authStore.getAuthData?.name);
const getUserPhone = computed(() => authStore.getAuthData?.phone);
const getUserBirthday = computed(() => {
  const year = $dayjs(authStore.getAuthData?.birthday).year().toString();
  const month = ($dayjs(authStore.getAuthData?.birthday).month() + 1).toString();
  const day = $dayjs(authStore.getAuthData?.birthday).date().toString();
  return `${year} 年 ${month} 月 ${day}日`;
});
const getUserAddress = computed(() => {
  const city = authStore.getAuthData?.address.city;
  const county = authStore.getAuthData?.address.county;
  const addressDetail = authStore.getAuthData?.address.detail;
  return `${city}${county}${addressDetail}`;
});

const handlleEditAuth = (): void => {
  isEditAuth.value = true;
};
const handlleEditInfo = (): void => {
  setNewData();
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
const restMemberForm: Member = {
  userId: "",
  name: "",
  phone: "",
  birthday: "1",
  address: {
    zipcode: null, //會傳入 number
    detail: "",
    city: "",
    county: "",
  },
  // oldPassword: "",
  // newPassword: "",
};

//修改的 api 好像可以拆開不傳遞密碼修改的屬性，所以新舊密碼修改直接寫到請求body
const memberForm = ref<Member>({
  userId: "",
  name: "",
  phone: "",
  birthday: "1",
  address: {
    zipcode: null, //會傳入 number
    detail: "",
    city: "",
    county: "",
  },
  // oldPassword: "",
  // newPassword: "",
});

//以下為 密碼 更改表單設定
// 模擬後端提供的舊密碼，用於驗證

const userFormSchema = zod
  .object({
    oldPassword: zod.string().min(1, { message: "必填" }),
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

type PutAuthErrorResponse = {
  status: boolean;
  message: string;
};

type PutAuthError = {
  response?: {
    _data?: PutAuthErrorResponse;
    status?: number;
  };
  message?: string;
};

const handleSaveAuth = saveAuth(
  async (values) => {
    // console.log("表單提交成功", values);
    memberForm.value.userId = authStore.getAuthData?._id as string;
    memberForm.value.name = authStore.getAuthData?.name as string;
    memberForm.value.phone = authStore.getAuthData?.phone as string;
    memberForm.value.birthday = $dayjs(authStore.getAuthData?.birthday as string).format("YYYY/MM/DD");
    memberForm.value.address.city = authStore.getAuthData?.address.city as string;
    memberForm.value.address.county = authStore.getAuthData?.address.county as string;
    memberForm.value.address.detail = authStore.getAuthData?.address.detail as string;
    memberForm.value.address.zipcode = authStore.getAuthData?.address.zipcode;
    // memberForm.value.oldPassword = oldPassword.value as string;
    // memberForm.value.newPassword = newPassword.value as string;
    try {
      const response = await $fetch<PutAuthResponse>(`${config.public.apiBase}/api/v1/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${useCookie(config.public.cookieAuth).value}`,
        },
        body: {
          ...memberForm.value,
          address: { ...memberForm.value.address },
          oldPassword: oldPassword.value as string,
          newPassword: newPassword.value as string,
        },
      });
      if (response.status) {
        $swal.fire({
          position: "center",
          icon: "success",
          title: "修改成功",
          text: `密碼修改完成`,
          showConfirmButton: false,
          timer: 1500,
        });
        authFormReset();
        isEditAuth.value = false;
      }
      // console.log(response);
    } catch (error) {
      const errorMes = error as PutAuthError;
      $swal.fire({
        position: "center",
        icon: "error",
        title: "修改失敗",
        text: `${errorMes.response?._data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  (errors) => {
    // console.log("表單驗證失敗", errors);
  }
);

const handleSaveInfo = saveInfo(
  async (values) => {
    // console.log("表單提交成功", values);
    const cityData = taiwanCity.find((cityItem) => cityItem.name === city.value);
    const districtsData = cityData?.districts.find((districtItem) => districtItem.name === county.value);
    const birthday: string = `${year.value}/${month.value}/${day.value}`;
    const zipcode: number = Number(districtsData?.zip);
    memberForm.value.userId = authStore.getAuthData?._id as string;
    memberForm.value.name = name.value as string;
    memberForm.value.phone = phone.value as string;
    memberForm.value.birthday = birthday;
    memberForm.value.address.city = city.value as string;
    memberForm.value.address.county = county.value as string;
    memberForm.value.address.detail = detailAddress.value as string;
    memberForm.value.address.zipcode = zipcode;
    try {
      const response = await $fetch<PutAuthResponse>(`${config.public.apiBase}/api/v1/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${useCookie(config.public.cookieAuth).value}`,
        },
        body: {
          ...memberForm.value,
          address: { ...memberForm.value.address },
        },
      });
      if (response.status) {
        await authStore.fetchUserData();
        infoFormReset();
        isEditInfo.value = false;
        $swal.fire({
          position: "center",
          icon: "success",
          title: "修改成功",
          text: `基本資料修改完成，請重新登入`,
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            window.location.reload();
          },
        });
      }
      // console.log(response);
    } catch (error) {
      const errorMes = error as PutAuthError;
      $swal.fire({
        position: "center",
        icon: "error",
        title: "修改失敗",
        text: `${errorMes.response?._data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // signUpForm.value.email = email.value as string;
    // signUpForm.value.password = password.value as string;
    // formState.value = "personalInfoForm";
    // resetForm();
  },
  (errors) => {
    // console.log("表單驗證失敗", errors);
  }
);
const setNewData = () => {
  name.value = authStore.getAuthData?.name;
  phone.value = authStore.getAuthData?.phone;
  year.value = $dayjs(authStore.getAuthData?.birthday).year().toString();
  month.value = ($dayjs(authStore.getAuthData?.birthday).month() + 1).toString();
  day.value = $dayjs(authStore.getAuthData?.birthday).date().toString();
  city.value = authStore.getAuthData?.address.city;
  county.value = authStore.getAuthData?.address.county;
  detailAddress.value = authStore.getAuthData?.address.detail;
};

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

// 會綁定到 年跟月 的 change事件，確保 日 會是正確的
const handleDateChange = () => {
  // 當年或月為空時不處理
  if (year.value === "" || month.value === "") {
    day.value = "";
    return;
  }

  // 計算選定月份的天數
  const daysInMonth = $dayjs(`${year.value}-${month.value}-01`).daysInMonth();

  // 重置日期
  day.value = "";

  // 如果已選擇的日期大於當月最大天數，則調整為當月最後一天
  if (Number(day.value) > daysInMonth) {
    day.value = String(daysInMonth);
  }
};

//綁定到 城市 的change事件 改變時候，初始化地區，確保城市地區一致
const handleCityChange = () => {
  if (city.value === "") return;
  county.value = "";
};
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
          <input class="font-bold bg-white" type="email" disabled :value="getUserName" />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">手機號碼</label>
          <input class="font-bold bg-white" type="phone" disabled :value="getUserPhone" />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">生日</label>
          <input class="font-bold bg-white" type="text" disabled :value="getUserBirthday" />
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="font-medium">地址</label>
          <input class="font-bold bg-white" type="text" disabled :value="getUserAddress" />
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
              <select v-model="year" @change="handleDateChange" class="appearance-none w-full p-4 text-black font-bold border rounded-lg bg-white cursor-pointer">
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
              <select v-model="month" @change="handleDateChange" class="appearance-none w-full p-4 text-black font-bold border rounded-lg bg-white cursor-pointer">
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
              <select v-model="city" @change="handleCityChange" class="appearance-none w-full p-4 text-black font-bold border rounded-lg bg-white cursor-pointer">
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
        <div class="mt-4 flex gap-x-4">
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
