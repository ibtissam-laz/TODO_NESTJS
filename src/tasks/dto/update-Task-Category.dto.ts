import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskCategory } from 'src/enums/enums';
export class UpdateTaskCategoryDto{
    @ApiProperty()
    @IsOptional()
    category: TaskCategory
    
}