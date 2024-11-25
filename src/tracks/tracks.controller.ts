import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-tracks.dto';
import { UpdateTrackDto } from './dto/update-tracks.dto';
import { JwtAuthGuard } from "src/auth/helper/jwt-auth.guard";

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findTrack(@Param('id') id: string) {
    return this.tracksService.findTrack(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.createTrack(createTrackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    this.tracksService.deleteTrack(id);
  }
}
