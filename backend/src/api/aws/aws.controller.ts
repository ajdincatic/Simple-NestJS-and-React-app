import { Post, UploadedFiles } from '@nestjs/common';
import { AwsService } from './aws.service';
import { InitController } from '../../decorators/init-controller.decorator';
import { FileUpload } from '../../decorators/file-upload.decorator';
import { ApiKeyAuth } from '../../decorators/api-key-auth.decorator';

@InitController('aws')
@ApiKeyAuth()
export class AwsController {
  constructor(private readonly _awsService: AwsService) {}

  @Post('upload-files')
  @FileUpload()
  async uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
    return this._awsService.uploadMultipleFilesToAws(files);
  }
}
