import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import apiRoutes from './routes/example-routes';
import userRoutes from './routes/user-routes';
import { setupSwagger } from './swagger';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use('/api', userRoutes);
setupSwagger(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
