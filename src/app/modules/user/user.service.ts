/* eslint-disable @typescript-eslint/no-explicit-any */

import { sendImageCloudinary } from '../../utils/fileUpload';
import { IUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (file: any, payload: IUser) => {
  // storage image into cloudinary
  const imageName = payload?.name;
  const path = file?.path;
  const { secure_url }: any = await sendImageCloudinary(imageName, path);
  payload.profilePhoto = secure_url;

  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserService = {
  registerUserIntoDB,
  getAllUserFromDB,
};

