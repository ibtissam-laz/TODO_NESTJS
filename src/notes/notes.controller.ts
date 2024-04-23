import { Controller, Get, Post, Body, Param, Put, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { User } from 'src/users/user.entity';
import { Note } from './note.entity';
import { UpdateNoteDto } from './dto/update-Note.dto';

@Controller('Notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Post('ADD')
  async createNote( 
  @Body('user') user: User,
  @Body('title') title: string,
  @Body('content') content: string
): Promise<Note> {
  console.log('note created successfully!');
  return this.notesService.createNote(user, title, content);
}
  @Get('mine')
  async getNotesByUser(@Body() user: User): Promise<Note[]> {
    return this.notesService.getNotesByUser(user);
  }
  @Get(':noteId')
  async getNoteById(@Param('noteId') noteId: number, @Body() user: User): Promise<Note>{
    return this.notesService.getNoteById(noteId,user);
  }
  @Patch(':noteId')
  async editNote(
    @Param('noteId') noteId: number, @Body() user: User, @Body() updateNoteDto: UpdateNoteDto
  ): Promise<void> {
    console.log('note updated successfully!')
    return await this.notesService.updateNote(noteId, user, updateNoteDto);
  }
  @Delete(':noteId')
  async removeNote(@Param('noteId', ParseIntPipe) noteId: number, @Body() user: User): Promise<void>{
    await this.notesService.deleteNote(noteId, user);
  }
}
