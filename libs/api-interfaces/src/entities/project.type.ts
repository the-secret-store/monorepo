import { ObjectID as ObjectIdType } from 'typeorm';
import { ProjectScope } from '../enums';

export interface IProject {
  readonly id: ObjectIdType;

  name: string;
  scope: ProjectScope;
  gitUrl: string;

  backup: Record<string, string>;
  secrets: Record<string, string>;

  members: ObjectIdType[];
  collaborators: ObjectIdType[];

  lastUpdatedBy: ObjectIdType;
  createdBy: ObjectIdType;
  owner: ObjectIdType;

  createdAt: Date;
  updatedAt: Date;
}
