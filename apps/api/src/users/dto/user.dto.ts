import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Role } from '../role.enum';

export class UserDto {
  @ApiProperty()
  _id: ObjectId;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty({ enum: Role, enumName: 'Role' })
  roles: Role[];
  @ApiProperty()
  receivedCredits: number;
  @ApiProperty()
  creditsToPlace: number;
  @ApiProperty()
  assignedUsers: string[];
}
