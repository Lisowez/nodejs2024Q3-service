import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Artist } from "src/entities/artist.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { Track } from "src/entities/track.entity";
import { Album } from "src/entities/album.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Artist,Track,Album])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
