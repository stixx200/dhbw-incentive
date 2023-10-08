import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Role } from '../role.enum';

@Injectable()
export class AssignedUsersGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user.roles?.includes(Role.Administrator)) {
      return true;
    }

    const accessedUserId = request.body.recipient || request.query.userId;
    const authenticatedUser = await this.usersService.findOneById(
      request.user._id,
    );
    return authenticatedUser.assignedUsers.includes(accessedUserId);
  }
}
