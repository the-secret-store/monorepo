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
import { Project } from '../project/project.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  readonly id: ObjectId;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @Column({ default: [] })
  @OneToMany(() => Project, project => project.owner)
  projects?: Array<ObjectIdType>;

  @Column({ default: [] })
  teams?: Array<ObjectIdType>;

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;

  @BeforeInsert()
  protected onCreate() {
    if (!this.projects) this.projects = [];

    if (!this.teams) this.teams = [];
  }
}
