import { Body, Controller, Inject, Post } from '@nestjs/common';
import UserCreate from '../../../application/UserCreate/UserCreate';
import { UserCreateDto } from '../dto/user-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export default class UserController {
  constructor(@Inject('UserCreate') private readonly userCreate: UserCreate) {}

  @Post()
  async createUser(@Body() body: UserCreateDto) {
    try {
      return this.userCreate.execute(body.name, body.email);
    } catch (error) {
      throw new Error(error);
    }
  }
}
