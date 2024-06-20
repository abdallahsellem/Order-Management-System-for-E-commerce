// src/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { OrderService } from '../orders/orders.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get a user by ID' })
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Create a user' })
  @Post()
  async createUser(
    @Body()
    createUserDto: {
      name: string;
      email: string;
      password: string;
      address: string;
    },
  ) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUserDto: Partial<{
      name: string;
      email: string;
      password: string;
      address: string;
    }>,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'get all user order history' })
  @Get(':userId/orders')
  async getUserOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getUserOrders(userId);
  }
}
