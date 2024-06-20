import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  providers: [ProductService,PrismaService,ProductRepository],
  controllers: [ProductController]
})
export class ProductsModule {}
