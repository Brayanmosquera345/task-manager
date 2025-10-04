import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import TaskOrmEntity from '@/core/task/infrastructure/persistence/entity/task-orm.entity';

@Entity('users')
export default class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => TaskOrmEntity, (task) => task.userId)
  tasks: TaskOrmEntity[];
}
