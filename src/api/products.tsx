import { ICreateProduct, IProduct } from "../interfaces/product";
import { axiosInstance } from "./axiosInstance";

export const fetchProducts = async (): Promise<IProduct[]> => {
  const { data } = await axiosInstance.get<{products: IProduct[]}>('?limit=100');
  return data.products;
};

export const fetchProduct = async (id: number): Promise<IProduct> => { 
  const { data } = await axiosInstance.get<IProduct>(`/${id}`);
  return data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get<string[]>('/category-list');
  return data;
};

//There are no actual changes on the server
export const deleteProduct = async (id: number): Promise<boolean> => { 
  const {data} = await axiosInstance.delete<{isDeleted: boolean}>(`/${id}`); 
  console.log('DELETE', data);
  return data.isDeleted;
};

//There are no actual changes on the server
export const addProduct = async (product: ICreateProduct): Promise<{id: number}> => {
  const { data } = await axiosInstance.post<{id: number}>('/add', { data: product } ); 
  console.log('ADD', data);
  return data;
};

//There are no actual changes on the server
export const updateProduct = async (product: ICreateProduct, id: number): Promise<{id: number}> => {
  const { data } = await axiosInstance.put<{id: number}>(`/${id}`, { data: product } ); 
  return data;
};