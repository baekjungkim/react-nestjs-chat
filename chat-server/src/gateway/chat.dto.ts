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
  @IsInt()
  @Type(() => Number)
  chatId: number;

  @IsInt()
  @Type(() => Number)
  toMessageId: number;

  @IsInt()
  @Type(() => Number)
  checkerId: number;
}

export class MessageCheckRangeDto {
  @IsInt()
  @Type(() => Number)
  chatId: number;

  @IsInt({ each: true })
  checkMesssageRange: [number, number];
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

  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsObject()
  chat: Chat;
}
