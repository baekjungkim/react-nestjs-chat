import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(userId: number): Promise<User[]> {
    return await this.userRepository.find({
      where: { id: Not(userId) },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }
}
