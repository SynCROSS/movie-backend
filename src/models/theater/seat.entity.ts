import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Theater } from './theater.entity';

@Entity()
export class Seat {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Theater, theather => theather.seats)
  theater: Theater;

  @ManyToOne(() => User, user => user.bookedSeats)
  user: User;
}
