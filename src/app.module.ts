import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { PrismaService } from 'prisma/prisma.service';
@Module({
  imports: [UsersModule, ProductsModule, OrdersModule, CartModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService, PrismaService],
})
export class AppModule {}
