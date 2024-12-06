/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import{  NextFunction, Request, Response } from 'express';


const globalErrorhandler=(err: any , req: Request, res :Response, next:NextFunction ) =>{

  const statusCode = 500;
  const message = err.message ||'Something Went Wrong'
  
  return res.status(statusCode).json({
    success:false,
    message:'Something Went Wrong ',
    error:err,
  })

}
export default globalErrorhandler;