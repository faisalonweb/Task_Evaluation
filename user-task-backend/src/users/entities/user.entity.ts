import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column('jsonb')
  actions: {
    create: boolean;
    delete: boolean;
    view: boolean;
    move: boolean;
  };
}
