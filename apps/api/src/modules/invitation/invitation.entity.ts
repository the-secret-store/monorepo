import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID as ObjectIdType,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Privilege } from '@the-secret-store/api-interfaces/enums';

@Entity()
export class Invitation {
  @ObjectIdColumn()
  readonly id: ObjectId;

  @Column()
  to: string;

  @Column({ type: 'string' })
  from: ObjectIdType;

  @Column({ type: 'string' })
  team: ObjectIdType;

  @Column({ enum: Privilege })
  privilege: Privilege;

  @Column()
  status: 'pending' | 'accepted' | 'rejected' | 'expired' | 'revoked' = 'pending';

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;
}
