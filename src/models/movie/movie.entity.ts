// import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
// import { MovieGenre } from './movie_genre.entity';

// @Entity()
// export class Movie {
//   @PrimaryColumn()
//   id: number;

//   @Column({
//     type: 'varchar',
//     unique: true,
//     length: 200,
//   })
//   original_title: string;

//   @Column('text')
//   overview: string;

//   @Column({
//     type: 'char',
//     length: 32,
//   })
//   poster_path: string;

//   @Column()
//   adult: boolean;

//   @Column('date')
//   release_date: string;

//   @Column('float')
//   vote_average: number;

//   @Column({
//     type: 'varchar',
//     length: 5,
//   })
//   media_type: string;

//   @OneToMany(() => MovieGenre, moviegenre => moviegenre.movie)
//   genre_ids: MovieGenre[];
// }
