import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusEnum } from '@/core/task/domain/entity/value-objects/task-status.ov';

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Estado de la tarea a cambiar',
    example: TaskStatusEnum.IN_PROGRESS,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
