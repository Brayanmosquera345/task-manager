import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Id of the user',
    example: '12345678-1234-1234-1234-123456789012',
  })
  id: string;
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    minLength: 3,
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Date of creation of the user',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Date of last update of the user',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: string;
  @ApiProperty({
    description: 'Date of deletion of the user (null if not deleted)',
    example: '2023-01-01T00:00:00.000Z | null',
    nullable: true,
  })
  deletedAt: string | null;
}
