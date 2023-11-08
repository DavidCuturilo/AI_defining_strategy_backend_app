import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Strategy } from './strategy.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  lastname: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @OneToMany(() => Strategy, (strategy) => strategy.user)
  strategies: Strategy[];
}
