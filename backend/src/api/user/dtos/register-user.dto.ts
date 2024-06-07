import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  ArrayMinSize,
  IsArray,
  IsUrl,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^(?=.*[0-9]).*$/, {
    message: 'Password must contain at least one number',
  })
  password: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(4, { message: 'At least 4 photos must be uploaded' })
  @IsUrl({}, { each: true, message: 'Each photo must be a valid URL' })
  photos: string[];
}
