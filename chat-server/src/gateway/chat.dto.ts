import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

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
