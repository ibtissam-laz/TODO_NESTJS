import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ImpDate from './impDate.entity';
import User from 'src/users/user.entity';
import { UpdateImpDateDto } from './dto/update-imp-date.dto';
@Injectable()
export class ImpDatesService {
    constructor(@InjectRepository(ImpDate) private impDateRepository: Repository<ImpDate>){}
    async createDate(user: User, event: string, impD: Date ): Promise<ImpDate> {
        const newImp = this.impDateRepository.create({event, impD});
        newImp.user = user;
        return await this.impDateRepository.save(newImp);
    }
    async getDatesByUser(user: User): Promise<ImpDate[] | undefined>{
        try{
            const impDates = await this.impDateRepository.find({
                relations: {
                user: true,
                },
                where: {
                user: {
                    userId: user.userId,
                }},
            });
            if(impDates){
                return impDates;
            }
            else{
                return null;
            }
        } 
        catch (err) {
            throw err;
        }
    }
    async getDateById(impId: number, user: User): Promise<ImpDate>{
        try{
            const Imp = await this.impDateRepository.findOne({
                relations: {
                user: true,
                },
                where: {
                impId: impId,
                user: {
                    userId: user.userId,
                }},
            });
            if(Imp){
                return Imp;
            }
            else{
                return null;
            }
        } 
        catch (err) {
            throw err;
        }
    }
    async updateImpD(impId: number, user: User, ImpU: UpdateImpDateDto): Promise<void>{
        const imp = await this.getDateById(impId, user);
    if(imp){
        await this.impDateRepository.update(impId,ImpU);
    }
    }
    async deleteImp(impId: number, user: User): Promise<void> {
        const imp = await this.getDateById(impId,user);
        await this.impDateRepository.remove(imp);
    }
}
