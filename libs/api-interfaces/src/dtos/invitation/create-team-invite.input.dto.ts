import { Privilege } from '../../enums';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateTeamInviteInputDto {
  @IsEmail()
  email: string;

  @IsMongoId()
  @IsNotEmpty()
  teamId: string;

  @IsEnum(Privilege)
  privilege: Privilege = Privilege.viewer;
}
