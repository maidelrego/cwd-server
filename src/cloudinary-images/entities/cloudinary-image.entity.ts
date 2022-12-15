import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CloudinaryImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  url: string;

  @Column('text')
  folder: string;

  @Column('text')
  assetId: string;

  @CreateDateColumn()
  createdAt: Date;
}
