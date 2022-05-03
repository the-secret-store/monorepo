import { Email } from '../../types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInputDto {
  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsEmail()
  @IsNotEmpty()
  email: Email;
}
