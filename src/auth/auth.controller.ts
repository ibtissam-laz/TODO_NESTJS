import { Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @Post('Login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req): Promise<any> {
      return this.authService.Token(req);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async Profile(@Request() req): Promise<any> {
      console.log(req.user);
      return req.user;
    }
}
