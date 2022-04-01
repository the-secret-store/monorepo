import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { docTags } from '../../constants/api-tags';
import { UserService } from './user.service';

@ApiTags(docTags.user.name)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(ObjectId(id));
    if (!user) throw new NotFoundException({ message: 'User not found' });
    return { message: 'User found', result: user };
  }
}
