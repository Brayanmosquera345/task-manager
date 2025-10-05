import { ChangeStatusTaskUseCase } from '@/core/task/application/ChangeStatusTask/change-status-task.use-case';
import { TaskRepository } from '@/core/task/domain/repository/task.repository';
import { TaskNotFoundException } from '@/core/task/domain/exceptions/task-not-found.exception';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import {
  TaskStatus,
  TaskStatusEnum,
} from '@/core/task/domain/entity/value-objects/task-status.ov';
import { Task } from '@/core/task/domain/entity/task.entity';
import { TaskName } from '@/core/task/domain/entity/value-objects/task-name.ov';
import { TaskDescription } from '@/core/task/domain/entity/value-objects/task-description.ov';
import { TaskDueDate } from '@/core/task/domain/entity/value-objects/task-due-date.ov';
import { EntityBase } from '@/core/shared-domain/entity/base.entity';

const UUID_EXAMPLE = 'e9733888-a36a-464f-abb5-7d799525c575';

function createTaskRepositoryMock(): jest.Mocked<TaskRepository> {
  return {
    getTaskById: jest.fn(),
    updateTask: jest.fn(),
  } as unknown as jest.Mocked<TaskRepository>;
}

function tomorrow(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
}

describe('ChangeStatusTaskUseCase', () => {
  let useCase: ChangeStatusTaskUseCase;
  let taskRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    taskRepository = createTaskRepositoryMock();
    useCase = new ChangeStatusTaskUseCase(taskRepository);
  });

  it('debe lanzar TaskNotFoundException si la tarea no existe', async () => {
    const id = new Uuid(UUID_EXAMPLE);
    taskRepository.getTaskById.mockResolvedValueOnce(null);

    await expect(useCase.execute(id, TaskStatusEnum.DONE)).rejects.toThrow(
      TaskNotFoundException,
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(taskRepository.getTaskById).toHaveBeenCalledWith(id.value);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(taskRepository.updateTask).not.toHaveBeenCalled();
  });

  it('debe actualizar el estado de una tarea existente', async () => {
    const id = new Uuid(UUID_EXAMPLE);
    const props = EntityBase.createNew();
    const task = new Task(
      id,
      new TaskName('Test task'),
      new TaskDescription('Task description'),
      new TaskStatus(TaskStatusEnum.PENDING),
      new TaskDueDate(tomorrow()),
      new Uuid(UUID_EXAMPLE),
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
    );

    taskRepository.getTaskById.mockResolvedValueOnce(task);
    taskRepository.updateTask.mockResolvedValueOnce(undefined);

    await useCase.execute(id, TaskStatusEnum.DONE);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(taskRepository.getTaskById).toHaveBeenCalledWith(id.value);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(taskRepository.updateTask).toHaveBeenCalledTimes(1);

    const updatedTask = taskRepository.updateTask.mock.calls[0][1];
    expect(updatedTask.status.value).toBe(TaskStatusEnum.DONE);
  });
});
