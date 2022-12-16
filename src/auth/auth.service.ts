import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // LETS CREATE A NEW USER
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hashSync(password, 10),
      });

      // LETS SAVE THE NEW USER
      const newUSer = await this.userRepository.save(user);

      // LETS RETURN THE NEW USER
      return this.checkAuthStatus(newUSer);
    } catch (error) {
      this.handleUserAlreadyExist(error);
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    // LETS FIND THE USER
    const user = await this.userRepository.findOne({
      where: { username },
      select: { username: true, password: true, id: true },
    });

    // LETS CHECK IF THE USER EXIST
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // LETS CHECK IF THE PASSWORD IS CORRECT
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    // LETS RETURN THE USER
    return this.checkAuthStatus(user);
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async checkAuthStatus(user: User) {
    return {
      token: this.getJwt({ id: user.id }),
    };
  }

  private handleUserAlreadyExist(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException('User already exist');
    }
  }
}
