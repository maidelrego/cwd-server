import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('text')
  phone: string;

  @Column('text')
  address: string;

  @Column('text')
  address2: string;

  @Column('text')
  city: string;

  @Column('text')
  state: string;

  @Column('numeric')
  zip: number;

  @Column('text')
  doorKit: string;

  @Column('text')
  doorDesign: string;

  @Column('text')
  finishColor: string;

  @Column('text')
  doorHandle: string;

  @Column('text')
  installOrDelivery: string;

  @Column('numeric')
  dimensionsH: number;

  @Column('numeric')
  dimensionsW: number;

  @CreateDateColumn()
  createdAt: Date;
}
