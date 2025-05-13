import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: '10А', description: 'Название класса' })
  @IsNotEmpty()
  @IsString()
  readonly className: string;

  @ApiProperty({ example: 2025, description: 'Учебный год' })
  @IsNotEmpty()
  @IsInt()
  readonly academicYear: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'ID классного руководителя (учитель)',
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  readonly classTeacherId?: number;
}
