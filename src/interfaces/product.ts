import { z, ZodType } from "zod";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  images?: string[] | null;
  thumbnail?: string;
  isFavorite: boolean;
}

export type ICreateProduct = Omit<IProduct, 'id'|'isFavorite'>;

export const productSchema: ZodType<ICreateProduct> = z.object({
  title: z
    .string({
      required_error: 'Required field',
    })
    .trim()
    .min(2, { message: 'Must be at least 2 characters' })
    .max(50, { message: 'Must be no more than 50 characters' }),
  category: z
    .string({
      required_error: 'Required field',
    }),
  brand: z
    .string()
    .trim()
    .min(1, { message: 'Required field' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Required field' }),
  price: z.coerce
    .number()
    .positive({
      message: 'Required field',
    }),
});

