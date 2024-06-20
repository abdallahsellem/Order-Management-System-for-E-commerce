// src/order/repositories/order.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(
    userId: number,
    orderItemsData: { productId: number, quantity: number }[],
    totalPrice: number
  ): Promise<Order> {
    return this.prisma.order.create({
      data: {
        userId,
        status: 'pending',
        orderItems: {
          create: orderItemsData.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
        orderDate: new Date(),
        totalPrice,
      },
      include: {
        orderItems: true,
      },
    });
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { orderId },
      include: { orderItems: { include: { product: true } } },
    });
  }

  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    return this.prisma.order.update({
      where: { orderId },
      data: { status },
    });
  }

  async getProductDetails(productId: number) {
    return this.prisma.product.findUnique({
      where: { productId },
    });
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { orderDate: 'desc' },
    });
  }


  async applyDiscount(orderId: number, discount: number): Promise<Order> {
    const order = await this.prisma.order.update({
      where: { orderId },
      data: { discount },
      include: { orderItems: true },
    });
    const totalDiscountedPrice = order.totalPrice - (order.totalPrice * discount) / 100;
    return this.prisma.order.update({
      where: { orderId },
      data: { totalPrice: totalDiscountedPrice },
      include: { orderItems: true },
    });
  }
}

