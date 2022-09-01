import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TaskEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';
import { BackendValidation } from 'src/shared/pipes/backendValidation';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidation())
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<TaskEntity[]> {
    return await this.taskService.getAllTasks(currentUserId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidation())
  async createTask(
    @User() currentUser: UserEntity,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    return await this.taskService.createTask(currentUser, createTaskDto);
  }

  @Put(':taskId')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidation())
  async updateTask(
    @User('id') currentUserId: number,
    @Param('taskId') taskId: number,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.updateTask(
      currentUserId,
      taskId,
      updateTaskDto,
    );
  }

  @Post(':taskId/complete')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidation())
  async completeTask(
    @User('id') currentUserId: number,
    @Param('taskId') taskId: number,
  ) {
    return await this.taskService.completeTask(currentUserId, taskId);
  }

  @Delete(':taskId')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidation())
  async deleteTask(
    @User('id') currentUserId: number,
    @Param('taskId') taskId: number,
  ) {
    return await this.taskService.deleteTask(currentUserId, taskId);
  }
}
