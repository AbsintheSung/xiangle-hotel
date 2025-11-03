import { getCulinaryList, CulinaryApi } from "~/services/api";

export const useCulinary = () => {
  return useAsyncData("culinaryResponse", async () => {
    const culinaryResponse = await getCulinaryList()

    const culinaryResult = CulinaryApi.culinary.responses[200].safeParse(culinaryResponse);
    if (culinaryResult.success) {
      // console.log('驗證成功');
      return culinaryResult.data.result;
    } else {
      // console.log('驗證失敗:', culinaryResult.error.errors);
      throw culinaryResult.error
    }
  },
    {
      getCachedData() {
        const culinaryCached = useNuxtData('culinaryResponse').data.value;
        if (culinaryCached) {
          // console.log("有緩存，使用緩存");
          return culinaryCached; // 返回緩存，不發送請求
        }
        // console.log("無緩存", "發送請求");
        return null; // 返回 null，會發送請求
      }
    }
  )
}