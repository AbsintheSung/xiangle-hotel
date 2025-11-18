import { z } from 'zod';

// 設施資訊」結構（重複使用的子結構）
const facilityItemSchema = z.object({
  title: z.string(),
  isProvide: z.boolean()
});

// 單一房間資料
const roomSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  imageUrlList: z.array(z.string().url()),
  areaInfo: z.string(),
  bedInfo: z.string(),
  maxPeople: z.number().int().positive(),
  price: z.number().positive(),//數字必須大於 0
  status: z.number().int(),

  // 使用剛才定義的 facilityItemSchema
  layoutInfo: z.array(facilityItemSchema),
  facilityInfo: z.array(facilityItemSchema),
  amenityInfo: z.array(facilityItemSchema),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

//單一房間回應
const singleRoomResponseSchema = z.object({
  status: z.boolean(),
  result: roomSchema
});

// 全部房間列表回應
const roomsListResponseSchema = z.object({
  status: z.boolean(),
  result: z.array(roomSchema),
});

export const roomsSchema = {
  roomsList: roomsListResponseSchema,
  singleRoom: singleRoomResponseSchema,
  roomItem: roomSchema
};