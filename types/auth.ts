// 定義地址結構
export type Address = {
  zipcode?: number | null; // 郵遞區號（可選）
  detail: string;   // 詳細地址
  city: string;     // 城市
  county: string;   // 縣市
};

// 定義註冊資料結構
export type SignUpForm = {
  name: string;        // 姓名
  email: string;       // 電子郵件
  password: string;    // 密碼
  phone: string;       // 電話號碼
  birthday: string;    // 生日，格式 yyyy/mm/dd
  address: Address;    // 地址
};


export type AuthUser = {
  address: Address;
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}