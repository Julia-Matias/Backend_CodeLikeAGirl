import { CreateProductDto } from '../dtos/product/create.product.dto';
import { CreatedProductDto } from '../dtos/product/created.product.dto';
import { ProductService } from '../service/product.service';
import { HttpStatus } from '../utils/enums/http-status.enum';
import { Request, Response } from 'express';
import { resolve } from 'path';

interface CreateProductBody extends Request {
  body: CreateProductDto;
}

interface UpdateProductDto extends Request {
  body: CreateProductDto;
}

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async create(
    { body, file }: CreateProductBody,
    response: Response,
  ): Promise<Response<CreatedProductDto>> {
    const product = await this.productService.create({
      ...body,
      image: file?.filename || '',
    });
    return response.status(HttpStatus.CREATED).json(product);
  }

  async getAll(
    _request: Request,
    response: Response,
  ): Promise<Response<CreatedProductDto[]>> {
    const product = await this.productService.getAll();
    return response.status(HttpStatus.OK).json(product);
  }

  async getById(
    { params }: Request,
    response: Response,
  ): Promise<Response<CreatedProductDto>> {
    const product = await this.productService.getByID(params.id);
    return response.status(HttpStatus.OK).json(product);
  }

  async getByCategoryName(
    { params }: Request,
    response: Response,
  ): Promise<Response<CreatedProductDto[]>> {
    const product = await this.productService.getByCategoryName(params.name);
    return response.status(HttpStatus.OK).json(product);
  }

  async getImgByName({ params }: Request, response: Response): Promise<any> {
    const directory = resolve(__dirname, '..', 'uploads');
    return response
      .status(HttpStatus.OK)
      .sendFile(`${directory}/${params.name}`);
  }

  async delete({ params }: Request, response: Response) {
    await this.productService.delete(params.id);
    return response.status(HttpStatus.OK).json();
  }

  async update(
    { body, file, params }: UpdateProductDto,
    response: Response,
  ): Promise<Response<void>> {
    const product = await this.productService.update(params.id, {
      ...body,
      image: file?.filename,
    });
    return response.status(HttpStatus.OK).json(product);
  }
}
