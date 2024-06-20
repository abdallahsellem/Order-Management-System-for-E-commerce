import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.productRepository.createProduct(data);
  }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async updateProduct(productId: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.productRepository.updateProduct(productId, data);
  }

  async deleteProduct(productId: number): Promise<Product> {
    const product = await this.productRepository.deleteProduct(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }
}
