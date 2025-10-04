import { ApiProperty } from '@nestjs/swagger';

export class ResponseTaskDto {
  @ApiProperty({
    description: 'Id of the task',
    example: '12345678-1234-1234-1234-123456789012',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the task',
    example: 'Task name',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Task description',
  })
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    example: 'PENDING',
  })
  status: string;

  @ApiProperty({
    description: 'Date of due date of the task',
    example: '2023-01-01T00:00:00.000Z',
  })
  dueDate: string;

  @ApiProperty({
    description: 'Date of creation of the task',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Date of last update of the task',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Date of deletion of the task (null if not deleted)',
    example: '2023-01-01T00:00:00.000Z | null',
    nullable: true,
  })
  deletedAt: string | null;
}
