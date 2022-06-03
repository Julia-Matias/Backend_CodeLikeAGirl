import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDto } from './create.product.dto';

export class CreatedProductDto extends CreateProductDto {
  id!: string;

  constructor({
    id,
    name,
    description,
    value,
    personCount,
    disponibility,
    image,
    category,
  }: ProductEntity) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.value = value;
    this.personCount = personCount;
    this.disponibility = disponibility;
    this.image = image;
    this.categoryId = category.id;
  }
}
