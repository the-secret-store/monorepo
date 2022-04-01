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
export class Team {
  @ObjectIdColumn()
  readonly id: ObjectId;

  @Column()
  name: string;

  @Column({ default: [] })
  admins: ObjectIdType[];

  @Column({ default: [] })
  editors: ObjectIdType[];

  @Column({ default: [] })
  viewers: ObjectIdType[];

  @Column({ default: [] })
  @OneToMany(() => Project, project => project.owner)
  projects: ObjectIdType[];

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

    this.admins = [this.createdBy];
    this.editors = [];
    this.viewers = [];
  }
}
