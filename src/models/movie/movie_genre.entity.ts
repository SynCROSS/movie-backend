import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class MovieGenre {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 15,
    unique: true,
  })
  name: string;

  @ManyToOne(() => Movie, movie => movie.genre_ids)
  movie: Movie;
}
