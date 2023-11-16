import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { StrategyType } from 'src/open_ai/dto/generate-strategy.request.dto';

@Entity()
export class Strategy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 250 })
  opponentClub: string;

  @Column({ type: 'varchar', length: 250 })
  club: string;

  @Column('enum', {
    array: true,
    nullable: true,
    enum: StrategyType,
  })
  type: StrategyType[];

  @ManyToOne(() => User, (user) => user.strategies)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
