import { IsIn, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '@/core/task/domain/entity/value-objects/task-status.ov';

const TASK_STATUSES = Object.values(TaskStatusEnum);

export class FindTasksQueryDto {
  @IsOptional()
  @IsString({ message: 'El estatus debe ser una cadena de texto.' })
  @IsIn(TASK_STATUSES as unknown as string[], {
    message: `El estatus debe ser uno de: ${TASK_STATUSES.join(', ')}.`,
  })
  status?: (typeof TASK_STATUSES)[number];
  @IsOptional()
  showDeleted?: boolean;
}
