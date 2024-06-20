// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: number) {
    
    return this.userRepository.findUserById(userId);
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    address: string;
  }) {
    // Additional business logic such as validation can go here
    return this.userRepository.createUser(data);
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
    // Additional business logic such as validation can go here
    return this.userRepository.updateUser(userId, data);
  }

  async deleteUser(userId: number) {
    // Additional business logic such as validation can go here
    return this.userRepository.deleteUser(userId);
  }
}
