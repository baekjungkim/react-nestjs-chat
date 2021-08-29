import { Type } from 'class-transformer';
import { IsInt, IsObject, IsString } from 'class-validator';

export class SendMessageDto {
  @IsInt()
  @Type(() => Number)
  chatId: number;

  @IsString()
  msg: string;

  @IsString()
  msgType: string;
}

export class MessageCheckDto {
  @IsInt({ each: true })
  @Type(() => Number)
  messageIds: number[];

  @IsInt()
  @Type(() => Number)
  chatId: number;
}

class Chat {
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsString()
  msg: string;

  @IsString()
  msgType: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}

export class ChatJoined {
  @IsInt({ each: true })
  @Type(() => Number)
  joinIds: number[];

  @IsObject()
  chat: Chat;
}
