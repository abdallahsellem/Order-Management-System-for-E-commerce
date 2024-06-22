// src/cart/cart.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a Cart' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'integer', description: 'The ID of the user' },
        productId: { type: 'integer', description: 'The ID of the product to add' },
        quantity: { type: 'integer', description: 'The quantity of the product to add' },
      },
      required: ['userId', 'productId', 'quantity'],
    },
  })
  @ApiResponse({ status: 201, description: 'Item successfully added to cart' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('add')
  addToCart(@Body('userId') userId: number, @Body('productId') productId: number, @Body('quantity') quantity: number) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @ApiOperation({ summary: 'get a Cart by id' })
  @Get(':userId')
  viewCart(@Param('userId',ParseIntPipe) userId: number) {
    return this.cartService.viewCart(userId);
  }

  @ApiOperation({ summary: 'Update a Cart' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'integer', description: 'The ID of the user' },
        productId: { type: 'integer', description: 'The ID of the product to update' },
        quantity: { type: 'integer', description: 'The new quantity of the product' },
      },
      required: ['userId', 'productId', 'quantity'],
    },
  })
  @ApiResponse({ status: 200, description: 'Cart successfully updated' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Put('update')
  updateCart(@Body('userId',ParseIntPipe) userId: number, @Body('productId') productId: number, @Body('quantity') quantity: number) {
    return this.cartService.updateCart(userId, productId, quantity);
  }

  @ApiOperation({ summary: 'Remove items from the cart' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'integer', description: 'The ID of the user' },
        productId: { type: 'integer', description: 'The ID of the product to remove' },
      },
      required: ['userId', 'productId'],
    },
  })
  @ApiResponse({ status: 200, description: 'Item successfully removed from cart' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Delete('remove')
  removeFromCart(@Body('userId',ParseIntPipe) userId: number, @Body('productId') productId: number) {
    return this.cartService.removeFromCart(userId, productId);
  }
}
