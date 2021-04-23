import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
// import { TV } from './tv.entity';

@Entity()
export class TVGenre {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  name: string;

  // @ManyToOne(() => TV, tv => tv.genre_ids)
  // tv: TV;
}
