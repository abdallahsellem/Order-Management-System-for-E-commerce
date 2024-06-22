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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly orderService: OrderService,
  ) {}

  @ApiOperation({ summary: 'Get a user by ID' })
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }


  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The name of the user' },
        email: {
          type: 'string',
          description: 'The email of the user',
          format: 'email',
        },
        password: { type: 'string', description: 'The password of the user' },
        address: { type: 'string', description: 'The address of the user' },
      },
      required: ['name', 'email', 'password', 'address'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The name of the user', nullable: true },
        email: { type: 'string', description: 'The email of the user', format: 'email', nullable: true },
        password: { type: 'string', description: 'The password of the user', nullable: true },
        address: { type: 'string', description: 'The address of the user', nullable: true },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'User not found' })
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
