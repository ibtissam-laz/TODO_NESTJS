import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    @Inject(UsersService)
    private readonly usersService: UsersService;
    async use(req: Request, res: Response, next: NextFunction) {
        try{
            const user = await this.usersService.user(req);
            if(user.message === 'success'){
                next();
            }
        }catch (error){
            res.status(401).json({ message: 'Unauthorized Access - Login First' });
        }
    }

}
