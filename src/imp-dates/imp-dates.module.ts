import { Module } from '@nestjs/common';
import { ImpDatesController } from './imp-dates.controller';
import { ImpDatesService } from './imp-dates.service';
import ImpDate from './impDate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ImpDate])],
  controllers: [ImpDatesController],
  providers: [ImpDatesService],
  exports: [ImpDatesService]
})
export class ImpDatesModule {}
