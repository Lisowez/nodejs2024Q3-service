import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumsDto } from './dto/create-albums.dto';
import { JwtAuthGuard } from 'src/auth/helper/jwt-auth.guard';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAlbum(@Param('id') id: string) {
    return this.albumsService.findAlbum(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createAlbum(@Body() createAlbumsDto: CreateAlbumsDto) {
    return this.albumsService.createAlbum(createAlbumsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: CreateAlbumsDto,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    this.albumsService.deleteAlbum(id);
  }
}
