import express from 'express';
import { categoryRoutes } from './categoryRoutes';
import { AppDataSource } from './config/data-source';
import { env } from './config/environment-variables';
import { productRoutes } from './productRoutes';
import cors from 'cors';
import fs from 'fs';
import { resolve } from 'path';
import { HttpStatus } from './utils/enums/http-status.enum';

const directory = resolve(__dirname, '..', 'dist', 'uploads');
fs.rmSync(directory, { force: true });
fs.mkdirSync(directory);

const app = express();
app.use(express.json());
app.use([categoryRoutes, productRoutes]);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  }),
);

app.get('/status', (request, response) => {
  return response.json({
    status: HttpStatus.OK,
    hotname: request.hostname,
    ip: request.ip,
  });
});

const PORT = env.PORT || 3000;
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is Running in port ${PORT}`));
  })
  .catch((error) => console.log(error));
