import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITrack, tracksData } from 'src/dataBase/tracks.data';
import { v4, validate } from 'uuid';
import { CreateTrackDto } from './dto/create-tracks.dto';
import { UpdateTrackDto } from './dto/update-tracks.dto';

@Injectable()
export class TracksService {
  private tracks = tracksData;

  findAll() {
    return this.tracks;
  }

  findTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`Track with id ${id} is not valid.`);
    }

    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    return track;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack: ITrack = {
      id: v4(),
      ...createTrackDto,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findTrack(id);
    Object.assign(track, updateTrackDto);
    return track;
  }

  deleteTrack(id: string) {
    const track = this.findTrack(id);
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
