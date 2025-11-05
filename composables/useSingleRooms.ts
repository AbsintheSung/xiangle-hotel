import { getSingleRooms, RoomsApi } from "~/services/api";
import type { AsyncDataOptions } from "#app";
import type { SingleRoomResult } from "~/services/api";
export function useSingleRooms(id: string, options?: AsyncDataOptions<SingleRoomResult>) {
  return useAsyncData(
    'singleRoomResponse',
    async () => {
      const singleRoomResponse = await getSingleRooms(id);

      // 驗證數據
      const result = RoomsApi.singleRoom.responses[200].safeParse(singleRoomResponse);
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
      const singleRoomCached = useNuxtData('singleRoomResponse').data.value;
      if (singleRoomCached) {
        // console.log("有緩存，使用緩存");
        return singleRoomCached; // 返回緩存，不發送請求
      }
      // console.log("無緩存", "發送請求");
      return null; // 返回 null ，會發送請求
    },
    lazy: false,
    ...options
  }
  );
}
