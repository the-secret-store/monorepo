import { IsArray, IsOptional, IsString } from 'class-validator';
import * as generate from 'project-name-generator';

export class CreateTeamInputDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  admins: string[];

  @IsArray()
  @IsOptional()
  members: string[];

  @IsArray()
  @IsOptional()
  projects: string[];

  @IsString()
  @IsOptional()
  owner?: string;

  constructor() {
    this.name = generate({ words: 2, alliterative: true, number: true }).dashed;
  }
}
