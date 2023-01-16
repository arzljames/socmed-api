import { Module } from '@nestjs/common';
import { ProfileSchemaModule } from './profile/profile.schema.module';
import { UserSchemaModule } from './user/user.schema.module';

@Module({
  imports: [UserSchemaModule, ProfileSchemaModule],
  exports: [UserSchemaModule, ProfileSchemaModule],
})
export class ModelModule {}
