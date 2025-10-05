import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import UserOrmEntity from '@/core/user/infrastructure/persistence/entity/user-orm.entity';
import { TaskStatusEnum } from '@/core/task/domain/entity/value-objects/task-status.ov';
@Entity('tasks')
export default class TaskOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.PENDING,
  })
  status: TaskStatusEnum;

  @Column()
  dueDate: Date;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => UserOrmEntity, (user) => user.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserOrmEntity;
}
