import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { UsersService } from '../users/users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionsModel: Model<TransactionDocument>,
    private readonly userService: UsersService,
  ) {}

  getTransactionsForUser(userId: string) {
    return this.transactionsModel.find({ userId });
  }

  async createTransaction(
    senderId: string,
    transactionToCreate: CreateTransactionDto,
  ) {
    // todo: Make this transaction safe
    const transaction = new this.transactionsModel({
      ...transactionToCreate,
      sender: senderId,
      createdAt: new Date(),
    });
    await this.userService.reduceCredits(senderId, transactionToCreate.amount);
    await this.userService.addCredits(
      transactionToCreate.recipient,
      transactionToCreate.amount,
    );
    await transaction.save();
    return transaction;
  }
}
