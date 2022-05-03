import { IsEmail, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Privilege } from '../../enums';
import { Email } from '../../types';

export class CreateTeamInviteInputDto {
  @IsEmail()
  email: Email;

  @IsMongoId()
  @IsNotEmpty()
  teamId: string;

  @IsEnum(Privilege)
  privilege: Privilege = Privilege.viewer;
}
