import { StatusCodes } from 'http-status-codes';

import { ITag } from './tag.interface';
import { Tag } from './tag.model';
import AppError from '../../errors/AppError';

const createTagIntoDB = async (payload: ITag) => {
  const result = await Tag.create(payload);
  return result;
};

const getAllTagFromDB = async () => {
  const result = await Tag.find();
  return result;
};

const getSingleTagFromDB = async (id: string) => {
  const tags = await Tag.findOne({ id });
  if (!tags) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Sorry tag is not found');
  }
  return tags;
};

const updateTagIntoDB = async (_id: string, data: ITag) => {
  const tags = await Tag.findByIdAndUpdate(_id, data, { new: true });
  if (!tags) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Sorry tag is not found');
  }
  return tags;
};

const deleteTagFromDB = async (id: string) => {
  const tags = await Tag.findByIdAndDelete(id);
  if (!tags) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Sorry tag is not found');
  }
  return tags;
};

export const TagService = {
  createTagIntoDB,
  getAllTagFromDB,
  getSingleTagFromDB,
  updateTagIntoDB,
  deleteTagFromDB,
};
