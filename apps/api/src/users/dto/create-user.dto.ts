import { ApiProperty } from '@nestjs/swagger';
import * as inventiveInterfaces from '@incentive/api-interfaces';

export class CreateUserDto implements inventiveInterfaces.ICreateUserDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: false })
  firstname?: string;
  @ApiProperty({ required: false })
  lastname?: string;
  @ApiProperty({ required: false })
  roles?: string[];
  @ApiProperty({ required: false })
  assignedUsers?: string[];
}
