import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from './role.enum';
import { Roles } from '../auth/roles.decorator';
import { User, UserDocument } from './user.schema';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OwnRouteOrAdminGuard } from './guards/own-route-or-admin.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  @UseGuards(OwnRouteOrAdminGuard)
  @ApiResponse({ type: () => UserDto })
  @ApiParam({ name: 'userId' })
  async getUser(@Request() request, @Param('userId') userId: string) {
    const user = await this.userService.findOneById(userId);
    return this.userToRest(user);
  }

  @Roles(Role.Administrator)
  @Get('')
  @ApiResponse({ type: () => UserDto, isArray: true })
  async getUsers() {
    const users = await this.userService.findUsers();
    return users.map((user) => this.userToRest(user));
  }

  @Roles(Role.Administrator)
  @Post('')
  @ApiResponse({ type: () => UserDto })
  @ApiBody({ type: () => CreateUserDto })
  async createUser(@Body() userToCreate: CreateUserDto) {
    if (await this.userService.hasUser(userToCreate.email)) {
      throw new ConflictException(
        { email: userToCreate.email, error: 'User already exists' },
        'User already exists',
      );
    }
    const user = await this.userService.createUser(userToCreate);
    return this.userToRest(user);
  }

  @Roles(Role.Administrator)
  @Delete(':userId')
  @ApiParam({ name: 'userId' })
  async deleteUser(@Param('userId') userId: string) {
    await this.userService.deleteUser(userId);
  }

  @Roles(Role.Administrator)
  @Patch(':userId')
  @ApiBody({ type: () => PatchUserDto })
  @ApiParam({ name: 'userId' })
  async patchUser(@Param('userId') userId: string, @Body() update: User) {
    const user = await this.userService.updateUser(userId, update);
    return this.userToRest(user);
  }

  private userToRest(user: UserDocument) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user.toJSON();
    return result;
  }
}
