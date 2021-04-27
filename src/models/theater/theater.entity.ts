import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Check,
} from 'typeorm';
import { Seat } from './seat.entity';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  address: string;

  @Column()
  maxSeats: number;

  @OneToMany(() => Seat, seat => seat.theater)
  seats: Seat[];
}
