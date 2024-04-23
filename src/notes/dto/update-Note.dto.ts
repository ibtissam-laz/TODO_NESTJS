import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateNoteDto{
    @ApiProperty()
    @IsOptional()
    content: string
    @ApiProperty()
    @IsOptional()
    title: string
    
}