import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import UserCreate from '../../../application/UserCreate/UserCreate';
import { UserCreateDto } from '../dto/user-create.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllUserUseCase } from '@/core/user/application/UserFindAll/find-all-user.use-case';
import { UserResponseDto } from '../dto/user-response.dto';
import User from '@/core/user/domain/entity/user.entity';

@ApiTags('User')
@Controller('users')
export default class UserController {
  constructor(
    @Inject('UserCreate') private readonly userCreate: UserCreate,
    @Inject('FindAllUserUseCase')
    private readonly findAllUserUseCase: FindAllUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() body: UserCreateDto) {
    try {
      return this.userCreate.execute(body.name, body.email);
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponseDto],
  })
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    try {
      const users = await this.findAllUserUseCase.execute();
      return users.map((user) => this.mapToUserResponse(user));
    } catch (error) {
      throw new Error(error);
    }
  }

  private mapToUserResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt.toDateString(),
      updatedAt: user.updatedAt.toDateString(),
      deletedAt: user.deletedAt?.toDateString() ?? null,
    };
  }
}
