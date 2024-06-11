import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { Request } from 'express';
import { Photo } from './entities/photo.entity';
import { MeDto } from './dtos/me.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @InjectRepository(Photo)
    private readonly _photoRepository: Repository<Photo>,
  ) {}

  async me(request: Request, userDto: UserDto): Promise<MeDto> {
    const user = await this.getUserById(userDto.id);

    const photos = await this._photoRepository.find({
      where: {
        client: {
          id: user.id,
        },
      },
    });

    return { user, photos, token: request?.headers?.authorization };
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
