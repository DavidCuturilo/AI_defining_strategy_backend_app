import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  logger = new Logger('UserAuthGuard');
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.headers.authorization.split(' ')[1];

    if (!jwtToken || !this.jwtService.verify(jwtToken)) {
      return false;
    }

    const userId = this.jwtService.decode(jwtToken)['sub'];

    request.userId = userId;
    return true;
  }
}
