import { getNewsList, NewsApi } from "~/services/api";
export function useNewsList() {
  return useAsyncData(
    'newsResponse',
    async () => {
      const newsData = await getNewsList();
      console.log('newsData123', newsData);

      // 驗證數據
      const result = NewsApi.news.responses[200].safeParse(newsData);
      console.log('result132', result);
      if (result.success) {
        console.log('驗證成功');
        return result.data.result;
      } else {
        console.log('驗證失敗:', result.error.errors);
        throw result.error
      }
    }, {
    // useAsyncData & useFetrch 內建 callback，用於緩存數據避免切換頁面仍發送請求。
    getCachedData() {
      const cached = useNuxtData('newsResponse').data.value;
      if (cached) {
        console.log("有緩存，使用緩存");
        return cached; // 返回緩存，不發送請求
      }
      console.log("無緩存", "發送請求");
      return null; // 返回 undefined，會發送請求
    }
  }
  );
}
