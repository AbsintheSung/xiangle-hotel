import { z } from 'zod';

// 單筆美食項目的 schema
export const culinaryItemSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  diningTime: z.string(),
  image: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// 美食列表回應的 schema
export const culinaryListResponseSchema = z.object({
  status: z.boolean(),
  result: z.array(culinaryItemSchema)
});

export const culinarySchema = {
  culinaryItem: culinaryItemSchema,
  culinaryListResponse: culinaryListResponseSchema
};