import { Test, TestingModule } from '@nestjs/testing';
import TaskController from '@/core/task/infrastructure/http/controller/task.controller';
import { CreateTaskUseCase } from '@/core/task/application/CreateTask/create-task.use-case';
import { FindTaskByUserUseCase } from '@/core/task/application/FindTaskByUser/find-task-by-user.use-case';
import { DeleteTaskUseCase } from '@/core/task/application/DeleteTask/delete-task.use-case';
import { ChangeStatusTaskUseCase } from '@/core/task/application/ChangeStatusTask/change-status-task.use-case';
import { TaskStatusEnum } from '@/core/task/domain/entity/value-objects/task-status.ov';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { Task } from '@/core/task/domain/entity/task.entity';
import { TaskName } from '@/core/task/domain/entity/value-objects/task-name.ov';
import { TaskDescription } from '@/core/task/domain/entity/value-objects/task-description.ov';
import { TaskStatus } from '@/core/task/domain/entity/value-objects/task-status.ov';
import { TaskDueDate } from '@/core/task/domain/entity/value-objects/task-due-date.ov';
import { EntityBase } from '@/core/shared-domain/entity/base.entity';

const UUID_EXAMPLE = 'e9733888-a36a-464f-abb5-7d799525c575';

function tomorrow(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
}

describe('TaskController (Integration)', () => {
  let controller: TaskController;
  let createTaskUseCase: jest.Mocked<CreateTaskUseCase>;
  let findTaskByUserUseCase: jest.Mocked<FindTaskByUserUseCase>;
  let deleteTaskUseCase: jest.Mocked<DeleteTaskUseCase>;
  let changeStatusTaskUseCase: jest.Mocked<ChangeStatusTaskUseCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: 'CreateTaskUseCase', useValue: { execute: jest.fn() } },
        { provide: 'FindTaskByUserUseCase', useValue: { execute: jest.fn() } },
        { provide: 'DeleteTaskUseCase', useValue: { execute: jest.fn() } },
        {
          provide: 'ChangeStatusTaskUseCase',
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(TaskController);
    createTaskUseCase = module.get('CreateTaskUseCase');
    findTaskByUserUseCase = module.get('FindTaskByUserUseCase');
    deleteTaskUseCase = module.get('DeleteTaskUseCase');
    changeStatusTaskUseCase = module.get('ChangeStatusTaskUseCase');
  });

  it('debe crear una tarea correctamente', async () => {
    const dto = {
      name: 'Nueva tarea',
      description: 'Descripción',
      status: TaskStatusEnum.PENDING,
      dueDate: tomorrow(),
      userId: UUID_EXAMPLE,
    };

    createTaskUseCase.execute.mockResolvedValueOnce(undefined);

    await controller.createTask(dto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(createTaskUseCase.execute).toHaveBeenCalledWith(
      dto.name,
      dto.description,
      dto.status,
      dto.dueDate,
      dto.userId,
    );
  });

  it('debe listar las tareas de un usuario', async () => {
    const userId = UUID_EXAMPLE;
    const props = EntityBase.createNew();
    const domainTask = new Task(
      new Uuid('d23a777f-8f9a-40cc-8c21-df76c1a931c4'),
      new TaskName('Test Task'),
      new TaskDescription('Test Desc'),
      new TaskStatus(TaskStatusEnum.PENDING),
      new TaskDueDate(tomorrow()),
      new Uuid(userId),
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
    );

    findTaskByUserUseCase.execute.mockResolvedValueOnce([domainTask]);

    const result = await controller.findTaskByUserId(userId, {
      status: undefined,
      showDeleted: false,
    });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(findTaskByUserUseCase.execute).toHaveBeenCalledWith(
      new Uuid(userId),
      undefined,
      false,
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Task');
    expect(result[0].status).toBe(TaskStatusEnum.PENDING);
  });

  it('debe eliminar una tarea', async () => {
    const id = UUID_EXAMPLE;
    deleteTaskUseCase.execute.mockResolvedValueOnce(undefined);

    await controller.deleteTask(id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deleteTaskUseCase.execute).toHaveBeenCalledWith(new Uuid(id));
  });

  it('debe cambiar el estado de una tarea', async () => {
    const id = UUID_EXAMPLE;
    const dto = { status: TaskStatusEnum.DONE };
    changeStatusTaskUseCase.execute.mockResolvedValueOnce(undefined);

    await controller.changeStatus(id, dto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(changeStatusTaskUseCase.execute).toHaveBeenCalledWith(
      new Uuid(id),
      dto.status,
    );
  });
});
