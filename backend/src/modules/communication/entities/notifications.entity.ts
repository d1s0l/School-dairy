import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('Notifications')
export class Notification {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор уведомления',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID пользователя, для которого уведомление',
  })
  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    example: 'Новое домашнее задание по математике',
    description: 'Текст уведомления',
  })
  @Column({ type: 'varchar', length: 1024 })
  message: string;

  @ApiProperty({ description: 'Дата создания уведомления' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ example: false, description: 'Флаг прочтения уведомления' })
  @Column({ default: false })
  isRead: boolean;
}
