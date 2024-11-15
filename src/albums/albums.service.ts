import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { CreateAlbumsDto } from './dto/create-albums.dto';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) // Инжектим репозиторий Album
    private albumRepository: Repository<Album>,
  ) {}

  // Поиск всех альбомов
  async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  // Поиск альбома по ID
  async findAlbum(id: string): Promise<Album> {
    if (!validate(id)) {
      throw new BadRequestException(`Album with id ${id} is not valid.`);
    }

    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }
    return album;
  }

  // Создание нового альбома
  async createAlbum(createAlbumDto: CreateAlbumsDto): Promise<Album> {
    const newAlbum = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(newAlbum);
  }

  // Обновление альбома
  async updateAlbum(
    id: string,
    updateAlbumDto: CreateAlbumsDto,
  ): Promise<Album> {
    const album = await this.findAlbum(id);
    Object.assign(album, updateAlbumDto);
    return this.albumRepository.save(album);
  }

  // Удаление альбома
  async deleteAlbum(id: string): Promise<void> {
    await this.findAlbum(id); // Проверка существования альбома
    await this.albumRepository.delete(id); // Удаляем альбом
  }
}
