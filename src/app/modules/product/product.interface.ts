import { Types } from 'mongoose';

export type TProductStatus = 'In Stock' | 'Stock Out';

export interface IProduct {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  status: TProductStatus;
  productCode?: string;
  category: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}