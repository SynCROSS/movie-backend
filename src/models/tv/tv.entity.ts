import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { TVGenre } from './tv_genre.entity';

@Entity()
export class TV {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  original_name: string;

  @Column('text')
  overview: string;

  @Column({
    type: 'char',
    length: 32,
  })
  poster_path: string;

  @Column()
  adult: boolean;

  @Column('date')
  first_air_date: string;

  @Column('float')
  vote_average: number;

  @Column({
    type: 'varchar',
    length: 5,
  })
  media_type: string;

  @OneToMany(() => TVGenre, tvgenre => tvgenre.tv)
  genre_ids: TVGenre[];
}
