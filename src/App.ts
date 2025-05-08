import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import globalErrorHandeling from './app/middlewares/globalErrorHandeleing';
import router from './app/router';
const app: Application = express();
// using parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// application router
app.use('/api', router);

const testServer = async (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'BartaDesk-News-Server is running',
  });
};

app.get('/', testServer);

// global error handeler
app.use(globalErrorHandeling);
// not found router handeler
app.use(notFound);

export default app;
