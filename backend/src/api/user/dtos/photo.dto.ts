import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../shared/abstract.dto';

export class PhotoDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  client: string;
}
