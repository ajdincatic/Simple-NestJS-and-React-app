import { ApiProperty } from '@nestjs/swagger';
import { Photo } from '../entities/photo.entity';
import { UserDto } from './user.dto';

export class MeDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  photos: Photo[];

  @ApiProperty()
  token: string;
}
