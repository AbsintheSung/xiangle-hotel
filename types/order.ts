export type Address = {
  zipcode: number;
  detail: string;
};

export type UserInfo = {
  address: Address;
  name: string;
  phone: string;
  email: string;
};
export type Rooms = {
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
  layoutInfo: {
    title: string;
    isProvide: boolean;
  }[];
  facilityInfo: {
    title: string;
    isProvide: boolean;
  }[];
  amenityInfo: {
    title: string;
    isProvide: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}
export type Order = {
  _id: string;
  userInfo: UserInfo;
  roomId: Rooms; // 直接使用你已定義的 Rooms type
  checkInDate: string; // ISO 8601 日期格式
  checkOutDate: string; // ISO 8601 日期格式
  peopleNum: number;
  orderUserId: string;
  status: number; // 假設 0 表示未確認，其他狀態根據需求定義
  createdAt: string; // ISO 8601 日期格式
  updatedAt: string; // ISO 8601 日期格式
};

export type ResponseOrder = {
  status: boolean;
  result: Order;
};