import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    example: 1,
    description: 'ID пользователя, для которого уведомление',
  })
  @IsNotEmpty()
  @IsInt()
  readonly userId: number;

  @ApiProperty({
    example: 'Новое домашнее задание по математике',
    description: 'Текст уведомления',
  })
  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
