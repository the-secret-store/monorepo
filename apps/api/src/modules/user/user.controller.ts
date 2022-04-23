import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { docTags } from '../../constants/api-tags';
import { Protect } from '../auth/decorators';
import { UserService } from './user.service';

@ApiTags(docTags.user.name)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Protect()
  @Get('/generate-token')
  @Redirect('/auth/generate-token', HttpStatus.MOVED_PERMANENTLY)
  redirect() {
    //
  }
}
