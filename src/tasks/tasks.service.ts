import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import User from 'src/users/user.entity';
import { UpdateTaskDto } from './dto/update-Task.dto';
import { UpdateTaskCategoryDto } from './dto/update-Task-Category.dto';
import { TaskCategory } from 'src/enums/enums';
@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task)
  private tasksRepository: Repository<Task>){}
  async createTask( user: User, tache: string): Promise<Task> {
    const newTask = this.tasksRepository.create({tache});
    newTask.user = user;
    return await this.tasksRepository.save(newTask);
  }
  async getTasksByUser(user: User): Promise<Task[] | undefined>{
    try{
      const tasks = await this.tasksRepository.find({
        relations: {
          user: true,
        },
        where: {
          user: {
            userId: user.userId,
          }},
      });
      if(tasks){
        return tasks;
      }
      else{
        return null;
      }
    } 
      catch (err) {
      throw err;
      }
  }
  async getTaskById(taskId: number, user: User): Promise<Task> {
    try{
      const task = await this.tasksRepository.findOne({
        relations: {
          user: true,
        },
        where: {
          taskId: taskId,
          user: {
            userId: user.userId,
          }},
      });
      if(task){
        return task;
      }
      else{
        return null;
      } } 
      catch (err) {
      throw err;
      }
  }
  async updateTask(taskId: number, user: User, tacheU: UpdateTaskDto): Promise<void> {
    const task = await this.getTaskById(taskId, user);
    if(task){
      await this.tasksRepository.update(taskId,tacheU);
    }
  }
  async updateCategory(taskId: number, category: UpdateTaskCategoryDto) {
    switch(category.category){
      case TaskCategory.IMPORTANT:
        console.log('IMPORTANT')
      break;
      case TaskCategory.STUDY:
        console.log('STUDY')
      break;
      case TaskCategory.WORK:
        console.log('WORK')
      break;
      case TaskCategory.OTHER:
        console.log('OTHER')
      break;
      default:
        console.log('Personal')
      break;
    }
    return await this.tasksRepository.update(taskId,category);
  }
  async deleteTask(taskId: number, user: User): Promise<void> {
    const task = await this.getTaskById(taskId,user);
    await this.tasksRepository.remove(task);
  }

}