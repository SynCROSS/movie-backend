import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Seat } from '../movie/seat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  nickname: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Seat, seat => seat.user)
  bookedSeats: Seat[];
}
