import type { AppRoute } from '@ts-rest/core';
import { roomsSchema } from '@/services/schema';

const getRoomsListResponse = {
  method: 'GET',
  path: `/api/v1/rooms`,
  summary: '取得所有房型資料',
  responses: {
    200: roomsSchema.roomsList
  }
} satisfies AppRoute

const getSingleRoomResponse = {
  method: 'GET',
  path: `/api/v1/rooms/:id`,
  summary: '取得單筆房型資料',
  responses: {
    200: roomsSchema.singleRoom
  }
} satisfies AppRoute

export const roomsContract = {
  getRoomsListResponse,
  getSingleRoomResponse
}