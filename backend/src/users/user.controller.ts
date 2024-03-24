import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
