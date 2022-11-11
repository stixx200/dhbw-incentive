import { ApiProperty } from '@nestjs/swagger';
import * as inventiveInterfaces from '@incentive/api-interfaces';

export class CreateTransactionDto
  implements inventiveInterfaces.ICreateTransactionDto
{
  @ApiProperty({ required: true })
  recipient: string;
  @ApiProperty({ required: true, minimum: 1, multipleOf: 1 })
  amount: number;
}
