import express from 'express';
import { categoryRoutes } from './categoryRoutes';
import { AppDataSource } from './config/data-source';
import { env } from './config/environment-variables';
import { productRoutes } from './productRoutes';
import cors from 'cors';
import fs from 'fs';
import { resolve } from 'path';

const app = express();
app.use(express.json());
app.use([categoryRoutes, productRoutes]);

const directory = resolve(__dirname, '..', 'dist', 'uploads');
fs.rmSync(directory, { force: true });
fs.mkdirSync(directory);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  }),
);

const PORT = env.PORT || 3000;
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is Running in port ${PORT}`));
  })
  .catch((error) => console.log(error));
