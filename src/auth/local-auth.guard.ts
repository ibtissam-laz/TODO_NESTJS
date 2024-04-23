import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<any> {
      console.log('LocalAuthGuard is executed');
      return super.canActivate(context);
    }
}