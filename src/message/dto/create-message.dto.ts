import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: 'message只允许是字符串奥' })
  @IsNotEmpty({ message: '消息不能为空奥' })
  message: string;

  @IsArray({ message: 'users的类型为字符串数组奥' })
  @IsNotEmpty({ message: 'users为空奥' })
  users: string[];

  @IsString({ message: 'receiver的类型为字符串奥' })
  @IsNotEmpty({ message: '你还没有设置要发送给谁呢' })
  receiver: string;

  @IsString({ message: 'sender的类型为字符串奥' })
  @IsNotEmpty({ message: '你还没有设置发送人呢' })
  sender: string;
}
