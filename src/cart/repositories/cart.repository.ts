// src/cart/repositories/cart.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Cart, CartItem } from '@prisma/client';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCartByUserId(userId: number): Promise<(Cart & { cartItems: CartItem[] }) | null> {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: { include: { product: true } } },
    });
  }

  async clearCart(cartId: number): Promise<void> {
    await this.prisma.cartItem.deleteMany({ where: { cartId } });
  }

  async addProductToCart(userId: number, productId: number, quantity: number) {
    const cart = await this.getCartByUserId(userId);
    if (!cart) {
      return this.prisma.cart.create({
        data: {
          userId,
          cartItems: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.cartId, productId },
    });
    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { cartItemId: existingItem.cartItemId },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.cartId,
          productId,
          quantity,
        },
      });
    }
  }

  async updateProductQuantity(cartId: number, productId: number, quantity: number) {
    return this.prisma.cartItem.updateMany({
      where: { cartId, productId },
      data: { quantity },
    });
  }

  async removeProductFromCart(cartId: number, productId: number) {
    return this.prisma.cartItem.deleteMany({
      where: { cartId, productId },
    });
  }
}
