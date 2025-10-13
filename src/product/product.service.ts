import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
//import { Product } from './product.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  //private products: Product[] = [];

  // insertProduct(title: string, description: string, price: number) {
  //     const prodId = Math.random().toString();
  //   const newProduct = new Product(prodId, title, description, price);
  //   this.products.push(newProduct);
  //   return prodId;
  // }

  async create(createProductDto: CreateProductDto) {
    const isExist = await this.productsRepository.findOneBy({ title: createProductDto.title });
    if (isExist) {
      throw new Error('Product title already exists');
    }
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
    //return 'This action adds a new product';
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
    //return [...this.products];
    //return `This action returns all product`;
  }

  findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
    // const product = this.findProduct(productId)[0];
    // return {...product};
    //return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
    //return `This action updates a #${id} product`;
  }

  // updateProduct(
  //   productId: string,
  //   prodTitle: string,
  //   prodDecs: string,
  //   prodPrice: number,
  // ) {
  //   // const product = this.findProduct(productId)[0];
  //   // const index = this.findProduct(productId)[1];
  //   const [product, index] = this.findProduct(productId);
  //   const updatedProduct = {...product};
  //   if (prodTitle) {
  //     updatedProduct.title = prodTitle;
  //   }
  //   if (prodDecs) {
  //     updatedProduct.description = prodDecs;
  //   }
  //   if (prodPrice) {
  //     updatedProduct.price = prodPrice;
  //   }
  //   this.products[index] = updatedProduct;
  // }

  remove(id: string) {

    // const index = this.findProduct(id)[1];
    // this.products.splice(index, 1);
    //return `This action removes a #${id} product`;
  }

  // private findProduct(id: string): [Product, number] {
  //   const productIndex = this.products.findIndex(prod => prod.id === id);
  //   const product = this.products[productIndex];
  //   if (!product) {
  //       throw new NotFoundException('Could not find product.');
  //   }
  //   return [product, productIndex];
  // }
}
