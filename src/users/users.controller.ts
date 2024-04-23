import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe, Res, BadRequestException, UnauthorizedException, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor, InternalServerErrorException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private jwtService:JwtService) {}
    @Get('All')
    async getAll(): Promise<User[]> {
    return this.usersService.getAll();
    }
    @Post('SignUp')
    async register(
        @Body('email') email: string,
        @Body('pass') pass: string,
        @Body('username') username: string ) {
        const user = this.usersService.createUser({
            email, pass, username
        })
        return user;
    }   
    @Post('Login')
    async login(
        @Body('email') email: string,
        @Body('pass') pass: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.usersService.findUser(email);
        if(!user) {
            throw new BadRequestException('invalid email!');
        }
        console.log(await bcrypt.compare(pass, user.pass))
        if(!await bcrypt.compare(pass, user.pass)) {
            throw new BadRequestException('invalid password!');
        }
        const jwt = await this.jwtService.signAsync({userId: user.userId});
        response.cookie('jwt', jwt, {httpOnly: true})
        console.log('you logged in')
        return {
            message: 'success',
        
        };
    }
    @Get('user')
    async user(@Req() request: Request) {
        return this.usersService.user(request);
    }
    @Post('Logout')
    async logout(@Res({passthrough: true}) response: Response){
        if(response.clearCookie('jwt')){
        return {
            message: 'success'
            } 
        }else {
            response.status(401).json({
            message: 'User not connected. Can not log out.'
        });
        }
    }
    @Get(':email')
    async findByEmail(@Param('email') email: string): Promise<User | undefined> {
        return this.usersService.findUser(email)
    }
    @Get(':userId')
    async find0ne(@Param('userId', ParseUUIDPipe) userId: string): Promise<User> {
        return this.usersService.getOneById(userId);
    }
    // @Delete(':userId')
    // async delete(@Param('userId', ParseIntPipe) userId: number): Promise<void>{
    //     await this.usersService.deleteUser(userId);
    // }
    @Put(':userId')
    async updateU(@Param('userId', ParseUUIDPipe) userId: string,@Body('pass') pass: string ,@Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.update(userId, pass , updateUserDto);
    }

    // @Get(':userId/Notes')
    // async getNotes(@Param('userId', ParseUUIDPipe) userId: string) {
        
    // }
}


