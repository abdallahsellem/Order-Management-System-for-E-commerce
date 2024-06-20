// src/order/order.controller.ts
import { Controller, Post, Get, Param, Body, Put, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './orders.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'create an order' })
  @Post()
  createOrder(@Body('userId',ParseIntPipe) userId: number) {
    return this.orderService.createOrder(userId);
  }

  @ApiOperation({ summary: 'get an order by id' })
  @Get(':orderId')
  getOrderById(@Param('orderId',ParseIntPipe) orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @ApiOperation({ summary: 'update an order' })
  @Put(':orderId/status')
  updateOrderStatus(@Param('orderId',ParseIntPipe) orderId: number, @Body('status') status: string) {
    return this.orderService.updateOrderStatus(orderId, status);
  }

  @ApiOperation({ summary: 'Apply  Coupons to Order' })
  @Post('apply-coupon')
  async applyCoupon(
    @Body('orderId', ParseIntPipe) orderId: number,
    @Body('discount', ParseIntPipe) discount: number
  ) {
    return this.orderService.applyCoupon(orderId, discount);
  }

}
