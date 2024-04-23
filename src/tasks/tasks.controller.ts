import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-Task.dto';
import User from 'src/users/user.entity';
import { UpdateTaskCategoryDto } from './dto/update-Task-Category.dto';

@Controller('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('ADD')
  async addTask(
    @Body('user') user: User,
    @Body('tache') tache: string
  ): Promise<Task> {
    console.log('Task created successfully!');
    return this.tasksService.createTask(user, tache);
  }
  @Get('mine')
  async getTasksByUser(@Body() user: User): Promise<Task[] | undefined> {
    return this.tasksService.getTasksByUser(user);
  }
  @Get(':taskId')
  async getTaskById(@Param('taskId') taskId: number, @Body() user: User): Promise<Task> {
    return this.tasksService.getTaskById(taskId, user);
  }
  @Patch(':taskId')
  async updateTask(@Param('taskId') taskId: number, @Body() user: User, @Body() updateTaskDto: UpdateTaskDto): Promise<void>{
    console.log('task updated successfully!');
    this.tasksService.updateTask(taskId, user, updateTaskDto);
  }
  @Patch('Category/:taskId')
  async updateTaskType(@Param('taskId') taskId: number, @Body() updateCategory: UpdateTaskCategoryDto){
    return this.tasksService.updateCategory(taskId, updateCategory);
  }
  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: number, @Body() user: User): Promise<void> {
    console.log('task deleted successfully!')
    await this.tasksService.deleteTask(taskId, user);
  }
}