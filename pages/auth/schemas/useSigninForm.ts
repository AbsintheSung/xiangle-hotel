import * as zod from "zod";

// 定義表單驗證 Schema
export const userFormSchema = zod.object({
  email: zod.string().email({ message: "請輸入有效的電子郵件地址" }),
  password: zod
    .string()
    .min(6, { message: "至少需要 6 個字元且含一個英文字母" })
    .regex(/[A-Za-z]/, { message: "必須包含至少一個英文字母" }),
});

export type UserFormSchema = zod.infer<typeof userFormSchema>
