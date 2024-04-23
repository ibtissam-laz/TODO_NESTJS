import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTaskDto{
    @ApiProperty()
    @IsOptional()
    tache: string
    @ApiProperty()
    @IsOptional()
    done: boolean
    
}