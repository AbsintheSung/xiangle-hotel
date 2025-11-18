import { z } from 'zod';

export const newsItemSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const newsListResponseSchema = z.object({
  status: z.boolean(),
  result: z.array(newsItemSchema)
});

// 導出所有 schema
export const newsSchema = {
  newsItem: newsItemSchema,
  newsListResponse: newsListResponseSchema
};