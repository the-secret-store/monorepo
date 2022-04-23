import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { docTags } from '../../constants/api-tags';
import { Protect } from '../auth/decorators';
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

  @Get('generate-token/:id')
  @ApiBearerAuth()
  @Protect()
  async generateToken(@Param('id') id: string) {
    const token = await this.userService.generateToken(ObjectId(id));
    return { message: 'Token generated successfully', result: token };
  }
}
