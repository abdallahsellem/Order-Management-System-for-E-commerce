import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './products.service';
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a Product' })
  @Post()
  async createProduct(@Body() productData: Prisma.ProductCreateInput) {
    return this.productService.createProduct(productData);
  }

  @ApiOperation({ summary: 'get a product by id' })
  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @ApiOperation({ summary: 'get all products' })
  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'update a product with id' })
  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Prisma.ProductUpdateInput,
  ) {
    return this.productService.updateProduct(id, updateData);
  }

  @ApiOperation({ summary: 'delete  a product with id' })
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
