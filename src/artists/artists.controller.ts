import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,UseGuards
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { JwtAuthGuard } from 'src/auth/helper/jwt-auth.guard';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findArtist(@Param('id') id: string) {
    return this.artistsService.findArtist(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.createArtist(createArtistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    this.artistsService.deleteArtist(id);
  }
}
