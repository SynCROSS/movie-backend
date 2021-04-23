import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Movie } from './models/movie/movie.entity';
import { MovieGenre } from './models/movie/movie_genre.entity';
import { TvModule } from './tv/tv.module';
// import { TV } from './models/tv/tv.entity';
import { TVGenre } from './models/tv/tv_genre.entity';
import { Theater } from './models/movie/theater.entity';
import { User } from './models/user/user.entity';
import { Seat } from './models/movie/seat.entity';

@Module({
  imports: [
    MoviesModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mathmech',
      database: 'netflex',
      entities: [MovieGenre, Theater, Seat, User, TVGenre],
      synchronize: true,
    }),
    TvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
