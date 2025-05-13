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

@Entity('Messages')
export class Message {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор сообщения',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID отправителя' })
  @Column()
  senderId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ApiProperty({ example: 2, description: 'ID получателя' })
  @Column()
  receiverId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @ApiProperty({ example: 'Привет, как дела?', description: 'Текст сообщения' })
  @Column({ type: 'varchar', length: 1024 })
  messageText: string;

  @ApiProperty({ description: 'Дата и время отправки сообщения' })
  @CreateDateColumn({ type: 'timestamp' })
  sentAt: Date;

  @ApiProperty({ example: false, description: 'Флаг прочтения сообщения' })
  @Column({ default: false })
  isRead: boolean;
}
