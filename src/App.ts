

import express, { Application,  Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorhandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/router';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const test= (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', test);

app.use(globalErrorhandler);
app.use(notFound);



//Not Found

export default app;
