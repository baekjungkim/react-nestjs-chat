import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query) {
    return await this.userService.findAll(query.userId);
  }

  @Get('/:userId/detail')
  async findOne(@Query() query, @Param() param) {
    return await this.userService.findOne(param.userId);
  }
}
