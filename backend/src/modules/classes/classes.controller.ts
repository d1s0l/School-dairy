import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dtos/create-class.dto';
import { UpdateClassDto } from './dtos/update-class.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchoolClass } from './entities/class.entity';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать класс' })
  @ApiResponse({ status: 201, description: 'Класс создан', type: SchoolClass })
  async create(@Body() createClassDto: CreateClassDto): Promise<SchoolClass> {
    return this.classesService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список классов' })
  async findAll(): Promise<SchoolClass[]> {
    return this.classesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о классе по ID' })
  async findOne(@Param('id') id: number): Promise<SchoolClass> {
    return this.classesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить информацию о классе' })
  async update(
    @Param('id') id: number,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<SchoolClass> {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить класс' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.classesService.remove(id);
  }
}
