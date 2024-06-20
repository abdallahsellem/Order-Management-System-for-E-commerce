import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { OrderRepository } from './repositories/order.repository';
import { PrismaService } from 'prisma/prisma.service';
import { CartRepository } from 'src/cart/repositories/cart.repository';

@Module({
  providers: [OrderService, OrderRepository, PrismaService,CartRepository],
  controllers: [OrderController],
})
export class OrdersModule {}
