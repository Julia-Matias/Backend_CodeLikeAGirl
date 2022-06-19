import { Request, Response, NextFunction, Router } from 'express';
import multer from 'multer';
import { AppDataSource } from './config/data-source';
import { multerConfig } from './config/multer';
import { ProductController } from './controllers/product.controller';
import { CreateProductDto } from './dtos/product/create.product.dto';
import { UpdateProductDto } from './dtos/product/uptade.product.dto';
import { validator } from './middlewares';
import { ProductService } from './service/product.service';

const productRoutes = Router();
const productController = new ProductController(
  new ProductService(AppDataSource),
);

productRoutes.post(
  '/products',
  multer(multerConfig).single('image'),
  CreateProductDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    productController.create(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.get(
  '/products',
  (request: Request, response: Response, next: NextFunction) => {
    productController.getAll(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.get(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.getById(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.get(
  '/products/:name',
  (request: Request, response: Response, next: NextFunction) => {
    productController
      .getByCategoryName(request, response)
      .catch((error: Error) => {
        next(error);
      });
  },
);

productRoutes.get(
  '/products/img/:name',
  (request: Request, response: Response, next: NextFunction) => {
    productController.getImgByName(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.delete(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.delete(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

productRoutes.put(
  '/products/:id',
  multer(multerConfig).single('image'),
  UpdateProductDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    productController.update(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

export { productRoutes };
