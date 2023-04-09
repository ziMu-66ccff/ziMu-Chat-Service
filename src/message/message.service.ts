import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async addMessage(createMessageDto: CreateMessageDto) {
    const messageData = await this.messageModel.create(createMessageDto);
    if (messageData) {
      return 'message had added successfully';
    }
    throw new HttpException('failed to add message to the database', 500);
  }

  async findAllMessage(sender: string, receiver: string) {
    const messages = await this.messageModel
      .find({
        users: {
          $all: [sender, receiver],
        },
      })
      .sort({ updateAt: 1 });

    return messages.map((message) => ({
      isSelf: message.sender === sender,
      message: message.message,
    }));
  }
}
