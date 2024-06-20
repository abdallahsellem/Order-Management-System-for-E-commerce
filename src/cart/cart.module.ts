import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRepository } from './repositories/cart.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [CartService,CartRepository,PrismaService],
  controllers: [CartController],
})
export class CartModule {}
