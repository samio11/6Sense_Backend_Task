import { AppError } from '../../errors/AppError';
import { ICategory } from './category.interface';
import { Category } from './category.model';


const createCategory = async (payload: ICategory) => {
  const isExists = await Category.findOne({ name: payload.name });

  if (isExists) {
    throw new AppError(400,'Category already exists');
  }

  const result = await Category.create(payload);
  return result;
};

const getAllCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
};