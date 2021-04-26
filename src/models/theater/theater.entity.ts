import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Check,
} from 'typeorm';
import { Seat } from './seat.entity';

@Entity()
@Check('"name" IN ("Theater1", "Theater2", "Theater3")')
export class Theater {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  address: string;

  @OneToMany(() => Seat, seat => seat.theater)
  seats: Seat[];
}
