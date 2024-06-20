import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { OrderService } from 'src/orders/orders.service';
import { OrderRepository } from 'src/orders/repositories/order.repository';
import {CartRepository} from "src/cart/repositories/cart.repository"
@Module({
  imports: [PrismaClient],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService,OrderService,CartRepository,OrderRepository],
})
export class UsersModule {}
