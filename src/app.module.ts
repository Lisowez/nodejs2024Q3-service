import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Album } from './entities/album.entity';
import { Artist } from './entities/artist.entity';
import { Track } from './entities/track.entity';
import { User } from './entities/user.entity';
import { Favorites } from './entities/favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
      entities: [Album, Artist, Track, User, Favorites],
      synchronize: true,
    }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
