export type Address = {
  zipcode?: number | null; // 郵遞區號（可選）
  detail?: string;   // 詳細地址
  city?: string;     // 城市
  county?: string;   // 縣市
};

export type Member = {
  userId: string;      // 用戶唯一識別 ID
  name: string;        // 用戶名稱
  phone: string;       // 電話號碼
  birthday: string;    // 出生日期（格式：YYYY/MM/DD）
  address: Address;    // 地址對象
  // oldPassword: string; // 舊密碼
  // newPassword: string; // 新密碼
};

type Result = {
  address: Address;       // 地址對象
  _id: string;            // 唯一標識符
  name: string;           // 使用者名稱
  email: string;          // 電子郵件
  phone: string;          // 電話號碼
  birthday: string;       // 出生日期 (ISO 格式)
  createdAt: string;      // 創建時間 (ISO 格式)
  updatedAt: string;      // 更新時間 (ISO 格式)
};

export type PutAuthResponse = {
  status: boolean;        // 狀態
  result: Result;         // 結果對象
};



export type PutMemberInfoResponse = {
  status: boolean;        // 狀態
  result: Result;         // 結果對象
};


//歷史紀錄
type UserInfo = {
  address: Address;
  name: string;
  phone: string;
  email: string;
};

type LayoutInfo = {
  title: string;
  isProvide: boolean;
};

type FacilityInfo = {
  title: string;
  isProvide: boolean;
};

type AmenityInfo = {
  title: string;
  isProvide: boolean;
};

type Room = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: LayoutInfo[];
  facilityInfo: FacilityInfo[];
  amenityInfo: AmenityInfo[];
  createdAt: string;
  updatedAt: string;
};

type DeleteOrderErrorResponse = {
  status: boolean;
  message: string;
};

//歷史訂單 資料型別
export type Order = {
  userInfo: UserInfo;
  _id: string;
  roomId: Room;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

//獲取歷史訂單 成功回應
export type HistoryResponse = {
  status: boolean;
  result: Order[];
};

//刪除訂單成功回應
export type DeleteHistoryResponse = {
  status: boolean;
  result: Order
}

export type DeleteOrderError = {
  response?: {
    _data?: DeleteOrderErrorResponse;
    status?: number;
  };
  message?: string;
};
