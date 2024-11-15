import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { CreateTrackDto } from './dto/create-tracks.dto';
import { UpdateTrackDto } from './dto/update-tracks.dto';
import { Track } from '../entities/track.entity'; // Импортируем сущность Track

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) // Инжектируем репозиторий Track
    private trackRepository: Repository<Track>,
  ) {}

  // Получаем все треки
  async findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  // Находим трек по ID
  async findTrack(id: string): Promise<Track> {
    if (!validate(id)) {
      throw new BadRequestException(`Track with id ${id} is not valid.`);
    }

    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    return track;
  }

  // Создаем новый трек
  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = this.trackRepository.create({
      id: v4(),
      ...createTrackDto,
    });
    return this.trackRepository.save(newTrack);
  }

  // Обновляем трек
  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.findTrack(id);
    Object.assign(track, updateTrackDto);
    return this.trackRepository.save(track);
  }

  // Удаляем трек
  async deleteTrack(id: string): Promise<void> {
    await this.findTrack(id); // Проверка существования трека
    await this.trackRepository.delete(id); // Удаление трека
  }
}
