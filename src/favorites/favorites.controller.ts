import { Controller, Get, Post, Delete, Param, HttpCode, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from "src/auth/helper/jwt-auth.guard";

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  addTrackToFavorite(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorite(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackFromFavorite(@Param('id') id: string) {
    return this.favoritesService.deleteTrackFromFavorite(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  addAlbumToFavorite(@Param('id') id: string) {
    return this.favoritesService.addAlbumsToFavorite(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavorite(@Param('id') id: string) {
    return this.favoritesService.deleteAlbumsFromFavorite(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  addArtistToFavorite(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorite(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavorite(@Param('id') id: string) {
    return this.favoritesService.deleteArtistFromFavorite(id);
  }
}
