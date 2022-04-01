import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamInputDto } from './create-team.input.dto';

export class UpdateTeamDto extends PartialType(CreateTeamInputDto) {}
