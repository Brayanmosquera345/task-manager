import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsIn,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusEnum } from '@/core/task/domain/entity/value-objects/task-status.ov';
import { Type } from 'class-transformer';

const TASK_STATUSES = Object.values(TaskStatusEnum);

export class CreateTaskDto {
  @ApiProperty({
    description: 'Nombre de la tarea',
    example: 'Planificación de la sprint 5',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, {
    message: 'El nombre de la tarea debe tener al menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'El nombre de la tarea no puede exceder los 50 caracteres.',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada de la tarea',
    example:
      'Definir historias de usuario, estimar puntos y asignar responsables.',
    minLength: 3,
    maxLength: 500,
  })
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres.' })
  @MaxLength(500, {
    message: 'La descripción no puede exceder los 500 caracteres.',
  })
  description: string;

  @ApiProperty({
    description:
      'El estado inicial de la tarea. Debe ser PENDING, IN_PROGRESS o DONE.',
    example: 'PENDING',
    enum: TASK_STATUSES,
    default: 'PENDING',
  })
  @IsNotEmpty({ message: 'El estatus es obligatorio.' })
  @IsString({ message: 'El estatus debe ser una cadena de texto.' })
  @IsIn(TASK_STATUSES as unknown as string[], {
    message: `El estatus debe ser uno de: ${TASK_STATUSES.join(', ')}.`,
  })
  status: (typeof TASK_STATUSES)[number];

  @ApiProperty({
    description: 'Fecha límite de la tarea en formato ISO 8601.',
    example: '2025-12-31T00:00:00.000Z',
    format: 'date-time',
  })
  @IsNotEmpty({ message: 'La fecha límite es obligatoria.' })
  @IsDate({ message: 'La fecha límite no es válida' })
  @Type(() => Date)
  dueDate: Date;

  @ApiProperty({
    description: 'ID del usuario asignado (clave foránea).',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'El ID de usuario es obligatorio.' })
  @IsUUID('4', { message: 'El ID de usuario debe ser un UUID válido.' })
  userId: string;
}
