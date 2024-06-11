import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from '../user/dtos/token-payload.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilsService } from '../../shared/helpers/utils.service';
import { LoggedUserDto } from '../user/dtos/logged-user.dto';
import { LoginDto } from '../user/dtos/login.dto';
import { RegisterUserDto } from '../user/dtos/register-user.dto';
import { Client } from '../user/entities/client.entity';
import { Photo } from '../user/entities/photo.entity';
import { SuccessfullyCreated } from '../../shared/types/successfuly-created.type';
import { DEFAULT_AVATAR_URL } from '../../shared/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly _clientRepository: Repository<Client>,
    @InjectRepository(Photo)
    private readonly _photoRepository: Repository<Photo>,
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoggedUserDto> {
    const user = await this._userRepository
      .createQueryBuilder('u')
      .where('u.email = :email', { email: loginDto.email })
      .getOne();

    if (!user) {
      throw new BadRequestException('Wrong username or password.');
    }

    const isPasswordValid = await UtilsService.validateHash(
      loginDto.password,
      user && user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Wrong username or password.');
    }

    const tokenPayload = await this.createToken(user);

    return new LoggedUserDto({ user, token: tokenPayload });
  }

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<SuccessfullyCreated> {
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
    client.email = email;
    client.password = password;
    client.active = true;
    client.avatarUrl = DEFAULT_AVATAR_URL;

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

  async createToken(user: User): Promise<TokenPayloadDto> {
    try {
      const expiresIn = +this._configService.get('JWT_EXPIRATION_TIME');

      const accessToken = await this._jwtService.signAsync(
        { id: user.id, email: user.email, isRefresh: false },
        {
          expiresIn,
        },
      );

      return new TokenPayloadDto({
        expiresIn,
        accessToken,
      });
    } catch (err) {
      Logger.error(err.message);
    }
  }
}
