import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';
import { WeekDay } from '../../../common/enums/week-day.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({ example: 1, description: 'ID класса' })
  @IsNotEmpty()
  @IsInt()
  readonly classId: number;

  @ApiProperty({ example: 1, description: 'ID предмета' })
  @IsNotEmpty()
  @IsInt()
  readonly subjectId: number;

  @ApiProperty({ example: 3, description: 'ID учителя' })
  @IsNotEmpty()
  @IsInt()
  readonly teacherId: number;

  @ApiProperty({ example: WeekDay.Monday, description: 'День недели' })
  @IsNotEmpty()
  @IsEnum(WeekDay)
  readonly dayOfWeek: WeekDay;

  @ApiProperty({ example: '09:00:00', description: 'Время начала урока' })
  @IsNotEmpty()
  @IsString()
  readonly startTime: string;

  @ApiProperty({ example: '09:45:00', description: 'Время окончания урока' })
  @IsNotEmpty()
  @IsString()
  readonly endTime: string;
}
