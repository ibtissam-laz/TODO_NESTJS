import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesController } from './notes.controller';
import User from 'src/users/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Note, User])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}