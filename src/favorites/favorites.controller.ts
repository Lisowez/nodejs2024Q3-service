import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  addTrackToFavorite(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorite(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackFromFavorite(@Param('id') id: string) {
    return this.favoritesService.deleteTrackFromFavorite(id);
  }

  @Post('album/:id')
  addAlbumToFavorite(@Param('id') id: string) {
    return this.favoritesService.addAlbumsToFavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavorite(@Param('id') id: string) {
    return this.favoritesService.deleteAlbumsFromFavorite(id);
  }

  @Post('artist/:id')
  addArtistToFavorite(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorite(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavorite(@Param('id') id: string) {
    return this.favoritesService.deleteArtistFromFavorite(id);
  }
}
