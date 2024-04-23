import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ImpDatesService } from './imp-dates.service';
import User from 'src/users/user.entity';
import ImpDate from './impDate.entity';
import { UpdateImpDateDto } from './dto/update-imp-date.dto';

@Controller('imp-dates')
export class ImpDatesController {
    constructor(private readonly impDatesService: ImpDatesService){}
    @Post('ADD')
    async addTask(
    @Body('user') user: User,
    @Body('event') event: string,
    @Body('impD') impD: Date
    ): Promise<ImpDate> {
    console.log('important date added successfully!');
    return this.impDatesService.createDate(user, event,impD);
    }
    @Get('mine')
    async getDates(@Body() user: User): Promise<ImpDate[] | undefined>{
        return this.impDatesService.getDatesByUser(user);
    }
    @Get(':impId')
    async getById(@Param('impId') impId: number, @Body() user: User): Promise<ImpDate>{
        return this.impDatesService.getDateById(impId, user);
    }
    @Patch(':impId')
    async updateImpD(@Param('impId') impId: number, @Body() user: User, @Body() impU: UpdateImpDateDto): Promise<void>{
        this.impDatesService.updateImpD(impId, user, impU);
    }
    @Delete(':impId')
    async deleteImpD(@Param('impId') impId: number, @Body() user: User): Promise<void>{
        console.log('date deleted successfully!');
        await this.impDatesService.deleteImp(impId, user);
    }
}
