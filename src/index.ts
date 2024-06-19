import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/example-routes.js';
import userRoutes from './routes/user-routes.js';
import { setupSwagger } from './swagger.js';
import { errorHandler } from './middleware/error-handler.js';
import { db } from './models/index.js';

const app: express.Express = express();
const port: string | number = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use('/api', userRoutes);

setupSwagger(app);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(errorHandler);

db.sequelize.sync().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});

export default app;
