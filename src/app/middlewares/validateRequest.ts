import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {

  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //console.log(`i am a shenabahini and my name is ${name}`)

      //validation check
      //if everything alright next()->
      await schema.parseAsync({
        body: req.body,
        cookies:req.cookies
      });

      next();
    })
  }
  export default validateRequest;
  // return async (req: Request, res: Response, next: NextFunction) => {
  //   //console.log(`i am a shenabahini and my name is ${name}`)

  //   try {
  //     //validation check
  //     //if everything alright next()->
  //     await schema.parseAsync({
  //       body: req.body,
  //     });

  //     next();
  //   } catch (err) {
  //     next(err);
  //   }
  // };


