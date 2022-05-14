import { IsEnum, IsString, IsUrl } from 'class-validator';
import * as generate from 'project-name-generator';
import { ProjectScope } from '../../enums';

export class CreateProjectInputDto {
  @IsString()
  name?: string;

  @IsEnum(ProjectScope)
  scope?: ProjectScope = ProjectScope.Personal;

  @IsUrl()
  gitUrl?: string;

  constructor() {
    this.name = generate({ words: 2, number: true, alliterative: true }).dashed;
  }
}
