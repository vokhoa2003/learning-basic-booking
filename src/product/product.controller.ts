import { UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // addProduct(
  //   @Body('title') prodTitle:string, 
  //   @Body('description') proDecs: string, 
  //   @Body('price') proPrice: number,
  // ) { 
  //   const generatedId = this.productService.insertProduct(prodTitle, proDecs, proPrice);
  //   return {id: generatedId};
  // }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() : Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  // @Patch(':id')
  // updateProduct(
  //   @Param('id') prodId: string,
  //   @Body('title') prodTitle: string,
  //   @Body('description') prodDecs: string,
  //   @Body('price') prodPrice: number,
  // ) {
  //   this.productService.updateProduct(prodId, prodTitle, prodDecs, prodPrice);
  //   return null;
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
