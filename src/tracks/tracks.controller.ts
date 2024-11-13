import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-tracks.dto';
import { UpdateTrackDto } from './dto/update-tracks.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findTrack(@Param('id') id: string) {
    return this.tracksService.findTrack(id);
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    this.tracksService.deleteTrack(id);
  }
}
