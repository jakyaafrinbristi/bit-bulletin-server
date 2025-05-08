/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { User_Role } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'editor' | 'reporter';
  bio?: string;
  profilePhoto?: string;
}

export interface UserModel extends Model<IUser> {
  isUserExitsByEmail(email: string): Promise<IUser | null>;
  isPasswordMatched(
    planePassword: string,
    hashedPassword: string
  ): Promise<IUser>;
  isPasswordIssuedBeforeChange(
    passwordChangedTimestamp: Date,
    passwordIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof User_Role;
