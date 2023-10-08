import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction extends TransactionDto {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  recipient: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: string;
  @Prop()
  amount: number;
  @Prop({ required: true })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
