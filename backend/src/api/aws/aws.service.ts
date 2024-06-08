import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UploadResultDto } from './dtos/upload-result.dto';

@Injectable()
export class AwsService {
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<UploadResultDto> {
    const result: UploadResultDto = {
      successfull: [],
      failed: [],
    };

    for (const file of files) {
      const key = `${uuid()}-${file.originalname}`;
      const Bucket = process.env.AWS_BUCKET;
      const Region = process.env.AWS_REGION;

      const command = new PutObjectCommand({
        Bucket,
        Body: file.buffer,
        Key: key,
        ACL: 'public-read',
        ContentType: file.mimetype,
      });

      try {
        await this.s3.send(command);
        const imageUrl = `https://${Bucket}.s3.${Region}.amazonaws.com/${key}`;
        result.successfull.push(imageUrl);
      } catch (err) {
        result.failed.push({
          image: file.originalname,
          message: err.message,
        });
      }
    }

    return result;
  }
}
