// src/cart/cart.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a Cart' })
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
  @Put('update')
  updateCart(@Body('userId',ParseIntPipe) userId: number, @Body('productId') productId: number, @Body('quantity') quantity: number) {
    return this.cartService.updateCart(userId, productId, quantity);
  }

  @ApiOperation({ summary: 'delete a Cart' })
  @Delete('remove')
  removeFromCart(@Body('userId',ParseIntPipe) userId: number, @Body('productId') productId: number) {
    return this.cartService.removeFromCart(userId, productId);
  }
}
