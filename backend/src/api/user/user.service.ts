import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoggedUserDto } from './dtos/logged-user.dto';
import { UtilsService } from '../../shared/helpers/utils.service';
import { AuthService } from './auth/auth.service';
import { UserDto } from './dtos/user.dto';
import { Client } from './entities/client.entity';
import { Photo } from './entities/photo.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly _clientRepository: Repository<Client>,
    @InjectRepository(Photo)
    private readonly _photoRepository: Repository<Photo>,
    private readonly _authService: AuthService,
  ) {}

  private readonly defaultAvatarUrl = 'https://picsum.photos/200/300';

  async login(loginDto: LoginDto): Promise<LoggedUserDto> {
    const userFind = await this._userRepository
      .createQueryBuilder('u')
      .where('u.email = :email', { email: loginDto.email })
      .getOne();

    if (!userFind) {
      throw new BadRequestException('Wrong username or password.');
    }

    const isPasswordValid = await UtilsService.validateHash(
      loginDto.password,
      userFind && userFind.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Wrong username or password.');
    }

    const tokenPayload = await this._authService.createToken(userFind);

    return new LoggedUserDto({ user: userFind, token: tokenPayload });
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const { firstName, lastName, email, password, photos } = registerUserDto;

    const userExsists = await this._userRepository.findOne({
      where: {
        email,
      },
    });

    if (userExsists) {
      throw new BadRequestException('Email already in use.');
    }

    const client = new Client();
    client.firstName = firstName;
    client.lastName = lastName;
    client.fullName = `${firstName} ${lastName}`;
    client.email = email;
    client.password = password;
    client.active = true;
    client.avatarUrl = this.defaultAvatarUrl;

    const savedClient = await this._clientRepository.save(client);

    const photoEntities = photos.map((photoUrl) => {
      const photo = new Photo();
      photo.url = photoUrl;
      photo.name = photoUrl.split('/').pop();
      photo.client = savedClient;
      return photo;
    });

    await this._photoRepository.save(photoEntities);

    savedClient.photos = photoEntities;

    this._clientRepository.save(savedClient);

    return { success: true, id: savedClient.id };
  }

  me(req: any, userDto: UserDto) {
    return { ...userDto, token: req.headers.authorization };
  }

  async getUserById(id: number): Promise<UserDto> {
    const user = await this._clientRepository
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
