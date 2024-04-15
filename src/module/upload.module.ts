import { Module } from '@nestjs/common';
import { UploadController } from 'src/controller/upload.controller';
import { UploadServices } from 'src/services/upload.services';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadServices],
})
export class UploadModule {}
