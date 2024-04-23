import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto{
    @ApiProperty()
    @IsOptional()
    email: string;
    @ApiProperty()
    @IsOptional()
    username: string;

}