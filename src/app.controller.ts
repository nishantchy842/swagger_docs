import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { promises as fsPromises } from 'fs';
import { Response } from 'express';
// import { EOL, arch, freemem, hostname, totalmem } from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @ApiOperation({ summary: 'test' })
  async hello() {
    return 'Hello World!';
  }

  //The fs.promises API provides an alternative set of asynchronous
  // file system methods that return Promise objects rather than using callbacks.
  //  The API is accessible via require('fs').promises.

  @Get('appentFile/:id')
  @ApiOperation({ summary: 'test' })
  async learning(@Param('id') id: string) {
    console.log(id);
    await fsPromises.appendFile('test.txt', id);
    await fsPromises.appendFile('another.txt', 'this is another');
  }

  @Get('copy')
  async copy(@Res() res: Response) {
    await fsPromises
      .copyFile('test.txt', 'another.txt')
      .then(() => res.json({ massage: 'copied successfully' }))
      .catch(() => 'not copied');
  }

  //fsPromises access method check path or file
  @Get('checkpath')
  async checkpath() {
    const res = await fsPromises
      .access('test.txt')
      .then(() => true)
      .catch(() => false);

    console.log(res, 'res');
    return res;
  }

  // @ApiTags('Learning os')
  // @Get('os')
  // async learingHttp() {
  //   debugger;
  //   const a = 5;
  //   console.log(a);
  //   debugger;

  //   // return await hostname();
  //   // return await arch();
  //   return (await totalmem()) / 1024 / 1024 / 1024;
  // }
}
