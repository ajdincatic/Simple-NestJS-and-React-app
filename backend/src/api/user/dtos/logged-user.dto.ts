import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadDto } from './token-payload.dto';
import { User } from '../entities/user.entity';

export class LoggedUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(data: { user: User; token: TokenPayloadDto }) {
    this.id = data.user.id;
    this.firstName = data.user.firstName;
    this.lastName = data.user.lastName;
    this.token = data.token;
  }
}
