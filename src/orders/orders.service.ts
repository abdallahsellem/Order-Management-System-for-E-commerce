// src/order/order.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from './repositories/order.repository';
import { CartRepository } from '../cart/repositories/cart.repository';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartRepository: CartRepository
  ) {}

  async createOrder(userId: number): Promise<Order> {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      throw new BadRequestException(`No items in the cart for user ID ${userId}`);
    }

    // Calculate total price and gather product details
    let totalPrice = 0;
    const orderItemsData = [];

    for (const item of cart.cartItems) {
      const product = await this.orderRepository.getProductDetails(item.productId);
      if (!product) {
        throw new NotFoundException(`Product not found for product ID ${item.productId}`);
      }

      totalPrice += product.price * item.quantity;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        productName: product.name,
        productPrice: product.price,
      });
    }

    const order = await this.orderRepository.createOrder(userId, orderItemsData, totalPrice);

    // Clear the cart after order creation
    await this.cartRepository.clearCart(cart.cartId);

    return order;
  }
  async getOrderById(orderId: number): Promise<Order> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException(`Order not found for order ID ${orderId}`);
    }
    return order;
  }

  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status: ${status}`);
    }

    const order = await this.orderRepository.updateOrderStatus(orderId, status);
    if (!order) {
      throw new NotFoundException(`Order not found for order ID ${orderId}`);
    }
    return order;
  }
  async getUserOrders(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.getUserOrders(userId);
    if (!orders || orders.length === 0) {
      throw new NotFoundException(`No orders found for user ID ${userId}`);
    }
    return orders;
  }

  async applyCoupon(orderId: number, discount: number): Promise<Order> {
    if (discount < 0 || discount > 100) {
      throw new BadRequestException(`Invalid discount percentage: ${discount}`);
    }

    const order = await this.orderRepository.applyDiscount(orderId, discount);
    if (!order) {
      throw new NotFoundException(`Order not found for order ID ${orderId}`);
    }
    return order;
  }
}
