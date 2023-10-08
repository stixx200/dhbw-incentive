import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Role } from './role.enum';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit() {
    await this.userService.ensureUser({
      email: 'admin@local',
      password: 'admin',
      firstname: 'Local',
      lastname: 'Administrator',
      roles: [Role.Administrator],
    });
  }
}
