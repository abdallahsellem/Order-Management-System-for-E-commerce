// src/order/order.controller.ts
import { Controller, Post, Get, Param, Body, Put, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './orders.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'create an order' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'integer', description: 'The ID of the user creating the order' },
      },
      required: ['userId'],
    },
  })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
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
  @ApiParam({ name: 'orderId', type: 'integer', description: 'The ID of the order' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', description: 'The new status of the order' },
      },
      required: ['status'],
    },
  })
  @ApiResponse({ status: 200, description: 'Order status successfully updated' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Put(':orderId/status')
  updateOrderStatus(@Param('orderId',ParseIntPipe) orderId: number, @Body('status') status: string) {
    return this.orderService.updateOrderStatus(orderId, status);
  }

  @ApiOperation({ summary: 'Apply  Coupons to Order' })
  @ApiOperation({ summary: 'Apply coupons to an order' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        orderId: { type: 'integer', description: 'The ID of the order' },
        discount: { type: 'integer', description: 'The discount percentage to apply' },
      },
      required: ['orderId', 'discount'],
    },
  })
  @ApiResponse({ status: 200, description: 'Coupon successfully applied' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('apply-coupon')
  async applyCoupon(
    @Body('orderId', ParseIntPipe) orderId: number,
    @Body('discount', ParseIntPipe) discount: number
  ) {
    return this.orderService.applyCoupon(orderId, discount);
  }

}
