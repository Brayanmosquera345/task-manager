import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskUseCase } from '@/core/task/application/CreateTask/create-task.use-case';

@ApiTags('task')
@Controller('tasks')
export default class TaskController {
  constructor(
    @Inject('CreateTaskUseCase')
    private readonly createTaskUseCase: CreateTaskUseCase,
  ) {}

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    try {
      return this.createTaskUseCase.execute(
        body.name,
        body.description,
        body.status,
        body.dueDate as unknown as Date,
        body.userId,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
