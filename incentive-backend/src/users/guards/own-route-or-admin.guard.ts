import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../role.enum';

@Injectable()
export class OwnRouteOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return (
      request.user.roles.includes(Role.Teamleader) ||
      request.user.roles.includes(Role.Administrator) ||
      request.params.userId === request.user._id
    );
  }
}
