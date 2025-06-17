import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/user/Roles';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    // If the request URL matches one of the bypass URLs, allow access
    for (const bypassUrl of Constants.BYPASS_URLS) {
      if (request.url === bypassUrl) {
        return true;
      }
    }

    // Otherwise, proceed with standard JWT authentication
    return super.canActivate(context);
  }
}
