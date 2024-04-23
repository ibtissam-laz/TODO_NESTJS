import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateImpDateDto{
    @ApiProperty()
    @IsOptional()
    event: string
    @ApiProperty()
    @IsOptional()
    impD: Date
    
}