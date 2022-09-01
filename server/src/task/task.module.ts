import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
