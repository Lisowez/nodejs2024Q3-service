import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { artistsData } from '../dataBase/artists.data';
import { IArtist } from '../dataBase/artists.data';
import { v4, validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { albumsData } from '../dataBase/albums.data';
import { tracksData } from '../dataBase/tracks.data';

@Injectable()
export class ArtistsService {
  private artists = artistsData;
  private albums = albumsData;
  private tracks = tracksData;

  findAll(): IArtist[] {
    return this.artists;
  }

  findArtist(id: string): IArtist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`Artist with id ${id} is not valid.`);
    }
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found.`);
    }
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist: IArtist = {
      id: v4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: CreateArtistDto) {
    const artist = this.findArtist(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  deleteArtist(id: string) {
    const tracks = this.tracks.filter((track) => track.artistId === id);
    const albums = this.albums.filter((album) => album.artistId === id);
    if (tracks.length > 0) {
      tracks.forEach((track) => {
        track.artistId = null;
      });
    }
    if (albums.length > 0) {
      albums.forEach((album) => {
        album.artistId = null;
      });
    }
    const artist = this.findArtist(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
