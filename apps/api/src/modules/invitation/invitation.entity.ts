import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID as ObjectIdType,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Privilege, ProjectAccessLevel } from '@the-secret-store/api-interfaces/enums';

@Entity()
export class Invitation {
  @ObjectIdColumn()
  readonly id: ObjectId;

  @Column()
  to: string;

  @Column({ type: 'string' })
  from: ObjectIdType;

  @Column({ type: 'string' })
  teamOrProject: ObjectIdType;

  @Column({ enum: Privilege })
  privilege?: Privilege;

  @Column({ enum: ProjectAccessLevel })
  accessLevel?: ProjectAccessLevel;

  @Column()
  status: 'pending' | 'accepted' | 'rejected' | 'expired' | 'revoked' = 'pending';

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;
}
