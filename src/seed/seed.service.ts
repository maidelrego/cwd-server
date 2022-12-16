import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seedData';
@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async executeSeed() {
    await this.insertNewUsers();
    return 'SEED EXECUTED';
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    for (const seedUser of seedUsers) {
      users.push(this.userRepository.create(seedUser));
    }

    const dbUsers = await this.userRepository.save(users);

    return dbUsers[0];
  }
}
