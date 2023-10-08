import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ required: true })
  recipient: string;
  @ApiProperty({ required: true, minimum: 1, multipleOf: 1 })
  amount: number;
}
