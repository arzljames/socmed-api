import { Module } from '@nestjs/common';
import { UserSchemaModule } from './user/user.schema.module';

@Module({
  imports: [UserSchemaModule],
  exports: [UserSchemaModule],
})
export class ModelModule {}
