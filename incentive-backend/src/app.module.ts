import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TransactionModule } from './transactions/transaction.module';
import { SharedModule, LoggerService } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, SharedModule],
      inject: [ConfigService, LoggerService],
      useFactory: async (configService: ConfigService, logger: LoggerService): Promise<MongooseModuleOptions> => {
        logger.setContext("MongooseModule.factory")
        const uri = configService.get<string>('MONGODB_URI')
        logger.log((`Use Mongodb uri: ${uri}`));
        return {
          uri,
          user: configService.get<string>('MONGODB_USER'),
          pass: configService.get<string>('MONGODB_PASS'),
        };
      },
    }),
    AuthModule,
    UsersModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
