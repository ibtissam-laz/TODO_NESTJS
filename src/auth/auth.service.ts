import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import User from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findUser(email);
    if (user && await bcrypt.compare(pass, user.pass)) {
      console.log('User Validation Success!');
      return user;
    }
      console.log('User Validation failed!');
      return null;
  }
  
  Token(user: any) {
    const payload = {pass: user.pass, sub: user.email};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
