import { ProjectScope } from '@the-secret-store/api-interfaces/enums';
import { ObjectId } from 'mongodb';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID as ObjectIdType,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Project {
  @ObjectIdColumn()
  readonly id: ObjectId;

  @Column()
  name: string;

  @Column({ enum: ProjectScope })
  scope: ProjectScope = ProjectScope.Personal;

  @Column({ type: 'json', default: {} })
  backup: Record<string, string>;

  @Column({ type: 'json', default: {} })
  secrets: Record<string, string>;

  @Column({ type: 'array', default: [] })
  specialAccessTokens: ObjectIdType[];

  @Column({ type: 'string' })
  lastUpdatedBy: ObjectIdType;

  @Column({ type: 'string' })
  createdBy: ObjectIdType;

  @Column({ type: 'string' })
  @OneToMany(() => User, user => user.projects)
  owner: ObjectIdType;

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;

  @BeforeInsert()
  protected beforeInsert() {
    if (!this.owner) this.owner = this.createdBy;
  }
}
