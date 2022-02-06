import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IncomingForm } from 'formidable';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async saveData(req) {
    const form = new IncomingForm({
      uploadDir: 'uploads',
      keepExtensions: true,
      filename: (name: string, ext: string) => {
        return `${name}${ext}`;
      },
    });
    return new Promise((resolve, reject) => {
      form.parse(req, (err, _, files) => {
        if (err) reject(err);
        resolve(files);
      });
    });
  }

  async uploadFile(req) {
    const USE_FASTIFY = this.configService.get('USE_FASTIFY');
    console.log(USE_FASTIFY);
    if (USE_FASTIFY === 'true') {
      const request = req.raw;
      console.log(USE_FASTIFY);
      return await this.saveData(request);
    } else {
      return await this.saveData(req);
    }
  }
}
