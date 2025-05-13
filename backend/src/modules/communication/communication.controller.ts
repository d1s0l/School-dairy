import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Message } from './entities/messages.entity';
import { Notification } from './entities/notifications.entity';

@ApiTags('communication')
@Controller('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  // Эндпоинты для сообщений

  @Post('messages')
  @ApiOperation({ summary: 'Создать сообщение' })
  @ApiResponse({ status: 201, description: 'Сообщение создано', type: Message })
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    return this.communicationService.createMessage(createMessageDto);
  }

  @Get('messages')
  @ApiOperation({ summary: 'Получить список сообщений' })
  async findAllMessages(): Promise<Message[]> {
    return this.communicationService.findAllMessages();
  }

  @Get('messages/:id')
  @ApiOperation({ summary: 'Получить сообщение по ID' })
  async findMessageById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Message> {
    return this.communicationService.findMessageById(id);
  }

  @Put('messages/:id')
  @ApiOperation({ summary: 'Обновить сообщение' })
  async updateMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    return this.communicationService.updateMessage(id, updateMessageDto);
  }

  @Delete('messages/:id')
  @ApiOperation({ summary: 'Удалить сообщение' })
  async removeMessage(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.communicationService.removeMessage(id);
  }

  // Эндпоинты для уведомлений

  @Post('notifications')
  @ApiOperation({ summary: 'Создать уведомление' })
  @ApiResponse({
    status: 201,
    description: 'Уведомление создано',
    type: Notification,
  })
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.communicationService.createNotification(createNotificationDto);
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Получить список уведомлений' })
  async findAllNotifications(): Promise<Notification[]> {
    return this.communicationService.findAllNotifications();
  }

  @Get('notifications/:id')
  @ApiOperation({ summary: 'Получить уведомление по ID' })
  async findNotificationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Notification> {
    return this.communicationService.findNotificationById(id);
  }

  @Put('notifications/:id')
  @ApiOperation({ summary: 'Обновить уведомление' })
  async updateNotification(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    return this.communicationService.updateNotification(
      id,
      updateNotificationDto,
    );
  }

  @Delete('notifications/:id')
  @ApiOperation({ summary: 'Удалить уведомление' })
  async removeNotification(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.communicationService.removeNotification(id);
  }
}
