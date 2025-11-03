import { z } from 'zod';
import { newsSchema } from '~/services/schema';
import { newsContract } from '~/services/contract';
import { initContract } from '@ts-rest/core';
export type NewsResponse = z.infer<typeof newsSchema.newsListResponse>
export type NewsItem = z.infer<typeof newsSchema.newsItem>;


export const NewsApi = initContract().router({
  news: newsContract.getNewsListResponse
})

// export const getNewsList = () => {
//   return $fetch(newsContract.getNewsListResponse.path, {
//     method: newsContract.getNewsListResponse.method
//   });
// }

export const getNewsList = () => {
  const config = useRuntimeConfig();  // ✅ 在函數內部調用
  return $fetch<NewsResponse>(newsContract.getNewsListResponse.path, {
    method: newsContract.getNewsListResponse.method,
    baseURL: config.public.apiBase  // 在這裡加上域名
  });
};