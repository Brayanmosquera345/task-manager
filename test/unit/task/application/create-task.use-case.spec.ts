import { CreateTaskUseCase } from '@/core/task/application/CreateTask/create-task.use-case';
import { TaskRepository } from '@/core/task/domain/repository/task.repository';
import { UuidGenerator } from '@/core/shared-domain/interfaces/uuid-generator';
import { UserRepository } from '@/core/user/domain/repository/user.repository';
import { UserNotFoundException } from '@/core/user/domain/exceptions/user-not-found.exception';
import { TaskStatusEnum } from '@/core/task/domain/entity/value-objects/task-status.ov';
import User from '@/core/user/domain/entity/user.entity';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import UserName from '@/core/user/domain/entity/value-objects/user-name.vo';
import UserEmail from '@/core/user/domain/entity/value-objects/user-email.vo';

const UUID_EXAMPLE = 'e9733888-a36a-464f-abb5-7d799525c575';

function createTaskRepositoryMock(): jest.Mocked<TaskRepository> {
  return {
    create: jest.fn(),
  } as unknown as jest.Mocked<TaskRepository>;
}

function createUuidGeneratorMock(): jest.Mocked<UuidGenerator> {
  return {
    generate: jest.fn().mockReturnValue(UUID_EXAMPLE),
  } as unknown as jest.Mocked<UuidGenerator>;
}

function createUserRepositoryMock(): jest.Mocked<UserRepository> {
  return {
    findById: jest.fn(),
  } as unknown as jest.Mocked<UserRepository>;
}

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let taskRepository: jest.Mocked<TaskRepository>;
  let uuidGenerator: jest.Mocked<UuidGenerator>;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    taskRepository = createTaskRepositoryMock();
    uuidGenerator = createUuidGeneratorMock();
    userRepository = createUserRepositoryMock();

    useCase = new CreateTaskUseCase(
      taskRepository,
      uuidGenerator,
      userRepository,
    );
  });

  it('debe lanzar UserNotFoundException si el usuario no existe', async () => {
    userRepository.findById.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(
        'Test Task',
        'Some description',
        TaskStatusEnum.PENDING,
        new Date(),
        'invalid-user-id',
      ),
    ).rejects.toThrow(UserNotFoundException);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(userRepository.findById).toHaveBeenCalledWith('invalid-user-id');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(taskRepository.create).not.toHaveBeenCalled();
  });

  it('debe crear una tarea si el usuario existe', async () => {
    const userId = new Uuid(UUID_EXAMPLE);
    const userName = new UserName('test-user');
    const userEmail = new UserEmail('test-user@test.com');
    const propsDate = User.createNew();
    const user = new User(
      userId,
      userName,
      userEmail,
      propsDate.createdAt,
      propsDate.updatedAt,
      propsDate.deletedAt,
    );
    userRepository.findById.mockResolvedValueOnce(user);
    taskRepository.create.mockResolvedValueOnce(undefined);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await useCase.execute(
      'Valid Task',
      'A valid description',
      TaskStatusEnum.IN_PROGRESS,
      tomorrow,
      userId.value,
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(userRepository.findById).toHaveBeenCalledWith(UUID_EXAMPLE);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(uuidGenerator.generate).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(taskRepository.create).toHaveBeenCalledTimes(1);

    const taskArg = taskRepository.create.mock.calls[0][0];
    expect(taskArg.name.value).toBe('Valid Task');
    expect(taskArg.description.value).toBe('A valid description');
    expect(taskArg.status.value).toBe(TaskStatusEnum.IN_PROGRESS);
    expect(taskArg.userId.value).toBe(UUID_EXAMPLE);
  });
});
