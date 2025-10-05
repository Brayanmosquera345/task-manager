import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  ValidationPipe,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskUseCase } from '@/core/task/application/CreateTask/create-task.use-case';
import { FindTaskByUserUseCase } from '@/core/task/application/FindTaskByUser/find-task-by-user.use-case';
import { ResponseTaskDto } from '../dto/response-task.dto';
import { Task } from '@/core/task/domain/entity/task.entity';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { mapDomainErrorToHttp } from '@/common/filters/exception.mapper';
import { FindTasksQueryDto } from '../dto/find-tasks-query.dto';
import { TaskStatusEnum } from '@/core/task/domain/entity/value-objects/task-status.ov';
import { DeleteTaskUseCase } from '@/core/task/application/DeleteTask/delete-task.use-case';

const TASK_STATUS_VALUES = Object.values(TaskStatusEnum);

@ApiTags('task')
@Controller('tasks')
export default class TaskController {
  constructor(
    @Inject('CreateTaskUseCase')
    private readonly createTaskUseCase: CreateTaskUseCase,
    @Inject('FindTaskByUserUseCase')
    private readonly findTaskByUserUseCase: FindTaskByUserUseCase,
    @Inject('DeleteTaskUseCase')
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
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
      throw mapDomainErrorToHttp(error);
    }
  }
  @ApiQuery({
    name: 'status',
    required: false,
    type: 'string',
    description: 'Filtro por estado de la tarea.',
    enum: TASK_STATUS_VALUES,
  })
  @ApiQuery({
    name: 'showDeleted',
    required: false,
    type: 'boolean',
    description: 'Filtro para mostrar tareas eliminadas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de tareas',
    type: [ResponseTaskDto],
  })
  @Get('/user/:userId')
  async findTaskByUserId(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Query(new ValidationPipe({ transform: true })) query: FindTasksQueryDto,
  ): Promise<ResponseTaskDto[]> {
    try {
      const id = new Uuid(userId);
      const tasks = await this.findTaskByUserUseCase.execute(
        id,
        query.status,
        query.showDeleted,
      );
      return tasks.map((task) => this.toResponseDto(task));
    } catch (error) {
      throw mapDomainErrorToHttp(error);
    }
  }

  @Delete(':id')
  async deleteTask(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    try {
      await this.deleteTaskUseCase.execute(new Uuid(id));
    } catch (error) {
      throw mapDomainErrorToHttp(error);
    }
  }

  private toResponseDto(task: Task): ResponseTaskDto {
    return {
      id: task.id,
      name: task.name.value,
      description: task.description.value,
      status: task.status.value,
      dueDate: task.dueDate.value.toDateString(),
      createdAt: task.createdAt.toDateString(),
      updatedAt: task.updatedAt.toDateString(),
      deletedAt: task.deletedAt?.toDateString() ?? null,
    };
  }
}
