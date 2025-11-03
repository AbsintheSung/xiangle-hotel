import { getRoomsList, RoomsApi } from "~/services/api";
export function useRooms() {
  return useAsyncData(
    'roomsResponse',
    async () => {
      const roomListResponse = await getRoomsList();

      // 驗證數據
      const result = RoomsApi.rooms.responses[200].safeParse(roomListResponse);
      if (result.success) {
        // console.log('驗證成功');
        return result.data.result;
      } else {
        // console.log('驗證失敗:', result.error.errors);
        throw result.error
      }
    }, {
    // useAsyncData & useFetrch 內建 callback，用於緩存數據避免切換頁面仍發送請求。
    getCachedData() {
      const roomsListCached = useNuxtData('roomsResponse').data.value;
      if (roomsListCached) {
        // console.log("有緩存，使用緩存");
        return roomsListCached; // 返回緩存，不發送請求
      }
      // console.log("無緩存", "發送請求");
      return null; // 返回 null ，會發送請求
    }
  }
  );
}
