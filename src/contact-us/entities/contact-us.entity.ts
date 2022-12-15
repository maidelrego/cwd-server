import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ContactUs {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  message: string;

  @Column('bool', { default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
