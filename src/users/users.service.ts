import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService) {}

    async findUser(email: string): Promise<User | undefined> {
      const user =await this.userRepository.findOne({ where: {email}});
      if (!user) throw new NotFoundException();
      return user;
    }
    
    async createUser(userC: any): Promise<User> {
        const user = await this.userRepository.findOne({where: {email: userC.email}});
        if(user?.email) {
          throw new BadRequestException('existing user!');
        } else {
          const salt = bcrypt.genSaltSync();
          const hash = await bcrypt.hash(userC.pass, salt);
          userC = { ...userC, pass: hash}
          return this.userRepository.save(userC); //INSERT
        }
    }
    async getAll(): Promise<User[]> {
      return this.userRepository.find();
  }
    async getOneById(userId: string): Promise<User | undefined> {
      const user = await this.userRepository.findOne({ where: {userId}});
      if(user) {
        return user;
      } else {
        throw new BadRequestException('User not found!');
      }
  }
  async user(request: Request) {
    try{
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if(!data) {
            throw new UnauthorizedException();
        }
        const user = await this.userRepository.findOne({where: {email: data['email']}});
        return {
        message: 'success',
        result: user
        };
    } catch (err) {
        throw new InternalServerErrorException();
    }
  }

  // async deleteUser(userId: string): Promise<User> {
  //     const user = await this.getOneById(userId);
  //     if(user){
  //       console.log('user deleted successfully');
  //     return this.userRepository.remove(user);
  //     } else {
  //       throw new BadRequestException('User not found!');
  //     }
  // }
  async update(userId: string, pass: string,updateUserDto:UpdateUserDto): Promise<User>{
    const user = await this.getOneById(userId);
      const salt = bcrypt.genSaltSync();
      const hash = await bcrypt.hash(pass, salt);
      const hashedPassword = { pass : hash };
      let updatedUser = Object.assign(user, updateUserDto);
      updatedUser = Object.assign(updatedUser, hashedPassword);
      await this.userRepository.save(updatedUser);
      console.log(updatedUser);
      return updatedUser;
  }
  
}
