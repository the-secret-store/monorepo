import { IsEmail, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Email } from '../../types';
import { ProjectAccessLevel } from '../../enums';

export class CreateProjectInviteInputDto {
  @IsEmail()
  email: Email;

  @IsMongoId()
  @IsNotEmpty()
  projectId: string;

  @IsEnum(ProjectAccessLevel)
  accessLevel: ProjectAccessLevel = ProjectAccessLevel.MEMBER;
}
