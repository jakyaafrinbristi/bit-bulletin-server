/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';

import { newsSearchableFields } from './news.constant';
import { INews } from './news.interface';
import { News } from './news.model';
import { sendImageCloudinary } from '../../utils/fileUpload';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';

const createNewsIntoDB = async (file: any, payload: INews) => {
  // storage image into cloudinary
  const imageName = payload?.title;
  const path = file?.path;
  const { secure_url }: any = await sendImageCloudinary(imageName, path);
  payload.thumbnail = secure_url;
  const result = await News.create(payload);
  return result;
};

const getAllNewsFromDB = async (query: Record<string, unknown>) => {
  const newsQuery = new QueryBuilder(
    News.find()
      .populate('author', 'name')
      .populate('category', 'name')
      .populate('tags', 'name'),
    query
  )
    .search(newsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await newsQuery.modelQuery;
  return result;
};

const getSingleNews = async (_id: string) => {
  const getNews = await News.findOne({ _id });
  if (!getNews) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Sorry news not found');
  }
  return getNews;
};

const updateNewsIntoDB = async (_id: string, payload: Partial<INews>) => {
  const updateNews = await News.findByIdAndUpdate(_id, payload, { new: true });
  if (!updateNews) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Sorry news not found');
  }
  return updateNews;
};

const deleteNewsFromDB = async (_id: string) => {
  const news = await News.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    { new: true }
  );
  if (!news) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Sorry news not found');
  }
  return news;
};

export const NewsService = {
  createNewsIntoDB,
  getAllNewsFromDB,
  getSingleNews,
  updateNewsIntoDB,
  deleteNewsFromDB,
};
