import { ApiProperty } from '@nestjs/swagger';

export class PatchUserDto {
  @ApiProperty({ required: false })
  firstname?: string;
  @ApiProperty({ required: false })
  lastname?: string;
  @ApiProperty({ required: false })
  roles?: string[];
  @ApiProperty({ required: false })
  receivedCredits?: number;
  @ApiProperty({ required: false })
  creditsToPlace?: number;
  @ApiProperty({ required: false })
  assignedUsers?: string[];
}
