import {
  Controller,
  HttpCode,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UploadServices } from 'src/services/upload.services';

@Controller('uploads')
@ApiTags('Uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadServices) {}
  @Post()
  @ApiOperation({ summary: 'upload your image' })
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async upload(
    @Req() req: Request,
    @UploadedFile(new ParseFilePipeBuilder().build())
    file: Express.Multer.File,
  ) {
    return await this.uploadService.uploadSingle(req, file);
  }
}
