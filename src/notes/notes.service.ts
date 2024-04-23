import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UpdateNoteDto } from './dto/update-Note.dto';

@Injectable()
export class NotesService {
  constructor( @InjectRepository(Note) 
    private notesRepository: Repository<Note>) {}
    async createNote( user: User, title: string, content: string): Promise<Note> {
      const newNote = this.notesRepository.create({ title, content });
      newNote.user = user;
      return await this.notesRepository.save(newNote);
    }
    async getNotesByUser(user: User): Promise<Note[]> {
      try{
        console.log(user)
      const notes = await this.notesRepository.find({
        relations: {
          user: true,
        },
        where: {
          user: {
            userId: user.userId,
          }},
      });
      
      if(notes){
        return notes;
      }
      else{
        return null;
      } } 
      catch (err) {
      throw err;
      }
    }
    async getNoteById(noteId: number, user: User): Promise<Note> {
      try{
        const note = await this.notesRepository.findOne({
          relations: {
            user: true,
          },
          where: {
            noteId: noteId,
            user: {
              userId: user.userId,
            }},
        });
        if(note){
          return note;
        }
        else{
          return null;
        } } 
        catch (err) {
        throw err;
        }
    }

  // async updateNote(noteId: number, user: User , noteU: UpdateNoteDto) {
  //   const note = await this.getNoteById(noteId,user);
  //   if(note){
  //     return await this.notesRepository.update(noteId, noteU);
  //   }
  // }

  async updateNote(noteId: number, user: User, noteU: UpdateNoteDto): Promise<void> {
    const note = await this.getNoteById(noteId, user);
    if(note){
      await this.notesRepository.update(noteId,noteU);
    }
  }

  async deleteNote(noteId: number, user: User): Promise<void> {
    const note = await this.getNoteById(noteId,user);
    await this.notesRepository.remove(note);
  }

}
