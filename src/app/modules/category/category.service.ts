import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
