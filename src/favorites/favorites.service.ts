import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { artistsData } from 'src/dataBase/artists.data';
import { favoritesData } from 'src/dataBase/favorites.data';
import { tracksData } from 'src/dataBase/tracks.data';
import { albumsData } from 'src/dataBase/albums.data';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  private favorites = favoritesData;
  private tracks = tracksData;
  private artists = artistsData;
  private albums = albumsData;

  getFavorites() {
    return this.favorites;
  }

  addTrackToFavorite(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`Track with id ${id} is not valid.`);
    }
    if (!track) {
      throw new UnprocessableEntityException(`Track with id ${id} not found.`);
    }
    this.favorites.tracks.push(track);
  }

  deleteTrackFromFavorite(id: string) {
    const track = this.favorites.tracks.find((track) => track.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`Track with id ${id} is not valid.`);
    }
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track.id !== id,
    );
  }

  addArtistToFavorite(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`Track with id ${id} is not valid.`);
    }
    if (!artist) {
      throw new UnprocessableEntityException(`Track with id ${id} not found.`);
    }
    this.favorites.artists.push(artist);
  }

  deleteArtistFromFavorite(id: string) {
    const artist = this.favorites.artists.find((artist) => artist.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`Track with id ${id} is not valid.`);
    }
    if (!artist) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
  }

  addAlbumsToFavorite(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Track with id ${id} is not valid.`);
    }
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException(`Track with id ${id} not found.`);
    }
    this.favorites.albums.push(album);
  }

  deleteAlbumsFromFavorite(id: string) {
    const album = this.favorites.albums.find((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`Track with id ${id} is not valid.`);
    }
    if (!album) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    this.favorites.albums = this.favorites.albums.filter(
      (album) => album.id !== id,
    );
  }
}
