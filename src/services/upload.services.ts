import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { promises as fsPromises } from 'fs';
import { extname } from 'path';

@Injectable()
export class UploadServices {
  private async checkPath() {
    const path = './uploads';
    try {
      await fsPromises.access(path); // Check if directory exists
    } catch (error) {
      // Directory doesn't exist, create it
      await fsPromises.mkdir(path);
    }
  }

  async uploadSingle(req: Request, file: Express.Multer.File) {
    await this.checkPath();

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Get current date in YYYYMMDD format

    const randomName = `${currentDate}_${Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('')}`;

    const fileName = `${randomName}${extname(file.originalname)}`;
    const filePath = `./uploads/${fileName}`;

    await fsPromises.writeFile(filePath, file.buffer);
    return {
      fileName,
      size: file.size,
      url: 'http://localhost:3000/uploads/' + fileName,
    };
  }
}
