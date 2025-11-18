// import { z } from 'zod';
import type { AppRoute } from '@ts-rest/core';
import { newsSchema } from '@/services/schema';

// const config = useRuntimeConfig();
const getNewsListResponse = {
  method: 'GET',
  path: `/api/v1/home/news`,
  summary: '取得新聞列表',
  responses: {
    200: newsSchema.newsListResponse
  }
} satisfies AppRoute


export const newsContract = {
  getNewsListResponse,
} satisfies Record<string, AppRoute>;