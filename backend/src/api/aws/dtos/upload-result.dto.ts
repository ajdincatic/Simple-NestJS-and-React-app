import { ApiProperty } from '@nestjs/swagger';

export class UploadResultDto {
  @ApiProperty()
  successfull: string[];

  @ApiProperty()
  failed: FileError[];
}

type FileError = {
  image: string;
  message: string;
};
