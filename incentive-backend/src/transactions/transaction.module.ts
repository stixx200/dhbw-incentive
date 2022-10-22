import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    UsersModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [],
})
export class TransactionModule {}
