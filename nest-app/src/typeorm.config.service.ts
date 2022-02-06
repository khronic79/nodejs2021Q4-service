import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get('POSTGRES_USER'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      database: this.configService.get('POSTGRES_DB'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/migration/*.js'],
      cli: { migrationsDir: __dirname + '/migration' },
      migrationsRun: true,
    };
  }
}
