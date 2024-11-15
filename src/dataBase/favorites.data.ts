import { IAlbum } from './albums.data';
import { IArtist } from './artists.data';
import { ITrack } from './tracks.data';

export interface IFavorites {
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
}

export const favoritesData: IFavorites = {
  artists: [],
  albums: [],
  tracks: [],
};
