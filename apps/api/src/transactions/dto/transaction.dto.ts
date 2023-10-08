import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({ required: true })
  recipient: string;
  @ApiProperty({ required: true })
  sender: string;
  @ApiProperty({ required: true, minimum: 1, multipleOf: 1 })
  amount: number;
  @ApiProperty({ required: true })
  createdAt: Date;
}
