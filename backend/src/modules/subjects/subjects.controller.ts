import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { UpdateSubjectDto } from './dtos/update-subject.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Subject } from './entities/subject.entity';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый предмет' })
  @ApiResponse({ status: 201, description: 'Предмет создан', type: Subject })
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список предметов' })
  async findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о предмете по ID' })
  async findOne(@Param('id') id: number): Promise<Subject> {
    return this.subjectsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить информацию о предмете' })
  async update(
    @Param('id') id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить предмет' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.subjectsService.remove(id);
  }
}
