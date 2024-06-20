// src/user/user.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(userId: number) {
    
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    address: string;
  }) {
    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(
    userId: number,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      address: string;
    }>,
  ) {
    const user= await this.prisma.user.update({
      where: { userId },
      data,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async deleteUser(userId: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { userId: userId }, // Ensure the 'id' field matches your Prisma schema
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error for record not found
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
      }
      // If it's a different error, rethrow it
      throw error;
    }
  }

}
