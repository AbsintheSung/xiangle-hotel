// import { z } from 'zod';
import type { AppRoute } from '@ts-rest/core';
import { culinarySchema } from '@/services/schema';

// const config = useRuntimeConfig();
const getCulinaryListResponse = {
  method: 'GET',
  path: `/api/v1/home/culinary`,
  summary: '取得美食列表',
  responses: {
    200: culinarySchema.culinaryListResponse
  }
} satisfies AppRoute


export const culinaryContract = {
  getCulinaryListResponse,
} satisfies Record<string, AppRoute>;