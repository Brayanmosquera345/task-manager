import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
