import { ProjectAccessLevel } from '../../enums';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateProjectInviteInputDto {
  @IsEmail()
  email: string;

  @IsMongoId()
  @IsNotEmpty()
  projectId: string;

  @IsEnum(ProjectAccessLevel)
  accessLevel: ProjectAccessLevel = ProjectAccessLevel.MEMBER;
}
