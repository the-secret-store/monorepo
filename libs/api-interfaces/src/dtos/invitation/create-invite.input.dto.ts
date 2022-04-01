import { Privilege } from '@the-secret-store/api-interfaces/enums';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateInviteInputDto {
  @IsEmail()
  email: string;

  @IsMongoId()
  @IsNotEmpty()
  teamId: string;

  @IsEnum(Privilege)
  privilege: Privilege = Privilege.viewer;
}
