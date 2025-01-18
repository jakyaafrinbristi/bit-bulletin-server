/* eslint-disable no-unused-vars */

//type method
// export type TUser = {
//   id: string;
//   password: string;
//   needsPasswordChange: boolean;
//   role: 'admin' | 'student' | 'faculty';
//   status: 'in-progress' | 'blocked';
//   isDeleted: boolean;
// };

import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

//  export type NewUser = {
//   password: string;
//   role: string;
// };

//interface method

export interface TUser  {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser>{
  
  isUserExistsByCustomId(id : string) : Promise<TUser>;
  isPasswordMatched(plainTextPassword : string,hashedPassword :string) :Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp :Date , jwtIssuedTimestamp: number) : boolean;
}
export type TUserRole = keyof typeof USER_ROLE;