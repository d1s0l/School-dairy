import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 1, description: 'ID отправителя' })
  @IsNotEmpty()
  @IsInt()
  readonly senderId: number;

  @ApiProperty({ example: 2, description: 'ID получателя' })
  @IsNotEmpty()
  @IsInt()
  readonly receiverId: number;

  @ApiProperty({ example: 'Привет, как дела?', description: 'Текст сообщения' })
  @IsNotEmpty()
  @IsString()
  readonly messageText: string;
}
