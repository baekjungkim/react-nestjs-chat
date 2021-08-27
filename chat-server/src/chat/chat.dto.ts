import { IsArray, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { type } from 'os';

export class CreateChatDto {
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsInt({ each: true })
  @IsArray()
  joinIds: number[];
}

export class MessageDto {
  @IsString()
  msg: string;

  @IsString()
  msgType: string;

  @IsInt()
  @Type(() => Number)
  chatId: number;

  @IsInt()
  @Type(() => Number)
  userId: number;
}
