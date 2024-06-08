import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  me(request: Request, userDto: UserDto) {
    return { ...userDto, token: request?.headers?.authorization };
  }

  async getUserById(id: number): Promise<UserDto> {
    const user = await this._userRepository
      .findOneOrFail({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('User not found');
      });

    return user.toDto();
  }
}
