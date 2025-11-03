import { z } from 'zod';
import { culinarySchema } from '~/services/schema';
import { culinaryContract } from '~/services/contract';
import { initContract } from '@ts-rest/core';


export type Culinaryresponse = z.infer<typeof culinarySchema.culinaryListResponse>
export type CulinaryItem = z.infer<typeof culinarySchema.culinaryItem>
export const CulinaryApi = initContract().router({
  culinary: culinaryContract.getCulinaryListResponse
})
export const getCulinaryList = () => {
  const config = useRuntimeConfig();
  return $fetch<Culinaryresponse>(culinaryContract.getCulinaryListResponse.path, {
    method: culinaryContract.getCulinaryListResponse.method,
    baseURL: config.public.apiBase
  });
};