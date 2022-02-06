import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  async uploadFile(@Req() req) {
    let result;
    try {
      result = await this.fileService.uploadFile(req);
    } catch (err) {
      throw new HttpException(
        'Problem with folder on server. File not saved',
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    const file = createReadStream(`uploads/${filename}`);
    return new StreamableFile(file);
  }
}
