// src/cart/cart.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    return this.cartRepository.addProductToCart(userId, productId, quantity);
  }

  async viewCart(userId: number) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException(`Cart not found for user ID ${userId}`);
    }
    return cart;
  }

  async updateCart(userId: number, productId: number, quantity: number) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException(`Cart not found for user ID ${userId}`);
    }
    return this.cartRepository.updateProductQuantity(cart.cartId, productId, quantity);
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException(`Cart not found for user ID ${userId}`);
    }
    return this.cartRepository.removeProductFromCart(cart.cartId, productId);
  }
}
