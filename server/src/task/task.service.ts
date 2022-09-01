import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateTaskDto } from './dto/createTask.dto';

Injectable();
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllTasks(currentUserId: number) {
    const queryBuilder = this.taskRepository
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.author', 'author')
      .where('author.id = :currentUserId', { currentUserId })
      .orderBy('tasks.createdAt', 'ASC');

    const tasks = await queryBuilder.getMany();

    return tasks;
  }

  async createTask(
    currentUser: UserEntity,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    const task = new TaskEntity();
    Object.assign(task, createTaskDto);

    task.author = currentUser;

    return this.taskRepository.save(task);
  }

  async updateTask(
    currentUserId: number,
    taskId: number,
    updateTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
    }

    if (task.author.id !== currentUserId) {
      throw new HttpException('You are not author', HttpStatus.FORBIDDEN);
    }

    Object.assign(task, updateTaskDto);

    return await this.taskRepository.save(task);
  }

  async completeTask(
    currentUserId: number,
    taskId: number,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
    }

    if (task.author.id !== currentUserId) {
      throw new HttpException('You are not author', HttpStatus.FORBIDDEN);
    }

    task.complete = !task.complete;

    return await this.taskRepository.save(task);
  }

  async deleteTask(currentUserId: number, taskId: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
    }

    if (task.author.id !== currentUserId) {
      throw new HttpException('You are not author', HttpStatus.FORBIDDEN);
    }

    return await this.taskRepository.delete({ id: taskId });
  }
}
