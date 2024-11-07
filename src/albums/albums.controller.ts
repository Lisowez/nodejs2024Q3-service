import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumsDto } from './dto/create-albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findAlbum(@Param('id') id: string) {
    return this.albumsService.findAlbum(id);
  }

  @Post()
  createAlbum(@Body() createAlbumsDto: CreateAlbumsDto) {
    return this.albumsService.createAlbum(createAlbumsDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: CreateAlbumsDto,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    this.albumsService.deleteAlbum(id);
  }
}
