import { ObjectId } from 'mongodb';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID as ObjectIdType,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectScope } from '@the-secret-store/api-interfaces/enums';
import { IProject } from '@the-secret-store/api-interfaces/entities';

@Entity()
export class Project implements IProject {
  @ObjectIdColumn()
  readonly id: ObjectId;

  @Column()
  name: string;

  @Column({ enum: ProjectScope })
  scope: ProjectScope = ProjectScope.Personal;

  @Column({ nullable: true })
  gitUrl: string;

  @Column({ type: 'json', default: {} })
  backup: Record<string, string>;

  @Column({ type: 'json', default: {} })
  secrets: Record<string, string>;

  @Column({ type: 'array', default: [] })
  members: ObjectIdType[];

  @Column({ type: 'array', default: [] })
  collaborators: ObjectIdType[];

  @Column({ type: 'string' })
  lastUpdatedBy: ObjectIdType;

  @Column({ type: 'string' })
  createdBy: ObjectIdType;

  @Column({ type: 'string' })
  owner: ObjectIdType;

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;

  @BeforeInsert()
  protected beforeInsert() {
    if (!this.owner) this.owner = this.createdBy;
    if (!this.collaborators) this.collaborators = [];
    if (!this.members) this.members = [];
    if (!this.secrets) this.secrets = {};
    if (!this.backup) this.backup = {};
  }
}
