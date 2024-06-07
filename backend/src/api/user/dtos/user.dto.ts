import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AbstractDto } from '../../../shared/abstract.dto';
import { Photo } from '../entities/photo.entity';

export class UserDto extends AbstractDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  avatarUrl: string;

  @ApiPropertyOptional({ isArray: true })
  photos: Photo[];

  // ! Excluded fields

  @Exclude()
  password: string;
}
