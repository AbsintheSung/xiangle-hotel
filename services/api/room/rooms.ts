import { z } from "zod";
import { roomsSchema } from "~/services/schema";
import { roomsContract } from "~/services/contract";
import { initContract } from '@ts-rest/core';
export type RoomsListResponse = z.infer<typeof roomsSchema.roomsList>
export type SingleRoomResponse = z.infer<typeof roomsSchema.singleRoom>
export type RoomsListResult = z.infer<typeof roomsSchema.roomsList>['result']
export type SingleRoomResult = z.infer<typeof roomsSchema.singleRoom>['result']
export type SingleRoomItem = z.infer<typeof roomsSchema.roomItem>

export const RoomsApi = initContract().router({
  rooms: roomsContract.getRoomsListResponse,
  singleRoom: roomsContract.getSingleRoomResponse
})

export const getRoomsList = () => {
  const config = useRuntimeConfig();
  return $fetch<RoomsListResponse>(roomsContract.getRoomsListResponse.path, {
    method: roomsContract.getRoomsListResponse.method,
    baseURL: config.public.apiBase
  });
};

export const getSingleRooms = (id: string) => {
  const config = useRuntimeConfig();
  return $fetch<SingleRoomResponse>(roomsContract.getSingleRoomResponse.path.replace(':id', id), {
    method: roomsContract.getSingleRoomResponse.method,
    baseURL: config.public.apiBase
  });
};