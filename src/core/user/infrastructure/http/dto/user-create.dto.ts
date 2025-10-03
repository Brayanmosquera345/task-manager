import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@gmail.com',
  })
  email: string;
}
