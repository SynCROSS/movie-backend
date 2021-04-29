import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Theater } from './theater.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'char',
    length: 2,
    unique: true,
  })
  seatNumber: string;

  @ManyToOne(() => Theater, theater => theater.seats)
  theater: Theater;

  @ManyToOne(() => User, user => user.bookedSeats)
  user: User;
}
