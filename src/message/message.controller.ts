import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('addMessage')
  addMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.addMessage(createMessageDto);
  }

  @Get('getAllMessage')
  getAllMessage(
    @Query('sender') sender: string,
    @Query('receiver') receiver: string,
  ) {
    return this.messageService.findAllMessage(sender, receiver);
  }
}
