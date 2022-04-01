import { IsMongoId, IsObject } from 'class-validator';
import { ObjectID as ObjectIdType } from 'typeorm';

export class UpdateSecretsInputDto {
  @IsMongoId()
  userId: ObjectIdType;

  @IsMongoId()
  projectId: ObjectIdType;

  @IsObject()
  secrets: Record<string, string>;
}
