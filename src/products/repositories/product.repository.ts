import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path if necessary
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async getProductById(productId: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { productId } });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async updateProduct(productId: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { productId },
      data,
    });
  }

  async deleteProduct(productId: number): Promise<Product> {
    return this.prisma.product.delete({ where: { productId } });
  }
}
