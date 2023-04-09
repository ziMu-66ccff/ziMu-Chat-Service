import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

const onlineUsers = new Map();

@WebSocketGateway(2999, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @SubscribeMessage('add-user')
  addUser(@MessageBody() username: string, @ConnectedSocket() client: Socket) {
    onlineUsers.set(username, client.id);
    console.log('有新的小伙伴上线了', onlineUsers);
  }

  @SubscribeMessage('send-message')
  sendMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const receivedUserSocket = onlineUsers.get(data.receiver);
    if (receivedUserSocket) {
      client.to(receivedUserSocket).emit('receive-message', data.message);
      console.log(
        '消息已经转发',
        data.message,
        data.sender,
        'to',
        data.receiver,
      );
    }
  }
}
