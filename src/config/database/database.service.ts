import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose/dist';

@Injectable()
export class DatabaseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get<string>('MONGODB_URI'),
      useNewUrlParser: true,
    };
  }
}
