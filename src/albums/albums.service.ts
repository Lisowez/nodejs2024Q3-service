import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAlbum, albumsData } from 'src/dataBase/albums.data';
import { v4, validate } from 'uuid';
import { CreateAlbumsDto } from './dto/create-albums.dto';
import { tracksData } from 'src/dataBase/tracks.data';

@Injectable()
export class AlbumsService {
  private albums = albumsData;
  private tracks = tracksData;

  findAll(): IAlbum[] {
    return this.albums;
  }

  findAlbum(id: string): IAlbum {
    const album = this.albums.find((album) => album.id === id);
    if (!validate(id)) {
      throw new BadRequestException(`Album with id ${id} is not valid.`);
    }
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumsDto): IAlbum {
    const newAlbum: IAlbum = { ...createAlbumDto, id: v4() };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: CreateAlbumsDto): IAlbum {
    const album = this.findAlbum(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  deleteAlbum(id: string) {
    const track = this.tracks.find((track) => track.albumId === id);
    if (track) {
      track.albumId = null;
    }
    const album = this.findAlbum(id);
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
