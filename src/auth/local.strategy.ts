import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    async validate(email: string, pass: string): Promise<any> {
        const user = await this.authService.validateUser(email, pass);
        if(!user) throw new UnauthorizedException({ message: 'Unauthorized Access' });
        return user;
    }
}
