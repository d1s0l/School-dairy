import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../common/enums/user-role.enum';

@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Column({ length: 255 })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @Column({ length: 255 })
  lastName: string;

  @ApiProperty({
    example: 'ivanov@example.com',
    description: 'Email пользователя',
  })
  @Column({ length: 255, unique: true })
  email: string;

  @ApiProperty({
    example: 'hashpassword',
    description: 'Хэш пароля пользователя',
  })
  @Column({ type: 'char', length: 64 })
  password: string;

  @ApiProperty({ example: UserRole.Student, description: 'Роль пользователя' })
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @ApiProperty({ description: 'Дата создания пользователя' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Дата последнего обновления пользователя' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
