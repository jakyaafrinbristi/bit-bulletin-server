import { Response } from "express";
// send response interface defination
interface ISendResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  token?: string;
  data: T | T[] | null;
}
//send response with custom function defination
const sendResponse = <T>(res: Response, data: ISendResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    token: data.token,
    data: data.data,
  });
};

export default sendResponse;
