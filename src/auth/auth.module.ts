import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
    imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, LocalAuthGuard],
    exports: [AuthService],
})
export class AuthModule {}