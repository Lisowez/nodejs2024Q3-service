import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from '../entities/artist.entity'; // Импортируем сущность
import { Track } from '../entities/track.entity'; // Импортируем сущность Track
import { Album } from '../entities/album.entity'; // Импортируем сущность Album

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) // Инжектируем репозиторий Artist
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track) // Инжектируем репозиторий Track
    private trackRepository: Repository<Track>,
    @InjectRepository(Album) // Инжектируем репозиторий Album
    private albumRepository: Repository<Album>,
  ) {}

  // Получаем всех артистов
  async findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  // Находим артиста по ID
  async findArtist(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException(`Artist with id ${id} is not valid.`);
    }

    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found.`);
    }
    return artist;
  }

  // Создаем нового артиста
  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistRepository.create({
      id: v4(),
      ...createArtistDto,
    });
    return this.artistRepository.save(newArtist);
  }

  // Обновляем артиста
  async updateArtist(
    id: string,
    updateArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    const artist = await this.findArtist(id);
    Object.assign(artist, updateArtistDto);
    return this.artistRepository.save(artist);
  }

  // Удаляем артиста
  async deleteArtist(id: string): Promise<void> {
    await this.findArtist(id); // Проверка существования артиста

    // Обновляем связанные треки и альбомы
    await this.trackRepository.update({ artistId: id }, { artistId: null });
    await this.albumRepository.update({ artistId: id }, { artistId: null });

    // Удаляем артиста
    await this.artistRepository.delete(id);
  }
}
