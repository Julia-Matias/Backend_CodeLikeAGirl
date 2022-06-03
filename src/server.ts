import express from 'express';
import { categoryRoutes } from './categoryRoutes';
import { AppDataSource } from './config/data-source';
import { env } from './config/environment-variables';
import { productRoutes } from './productRoutes';

const app = express();
app.use(express.json());
app.use([categoryRoutes, productRoutes]);

const PORT = env.PORT || 3000;
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is Running in port ${PORT}`));
  })
  .catch((error) => console.log(error));
