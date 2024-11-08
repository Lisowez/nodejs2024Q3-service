import { IAlbum } from './albums.data';
import { IArtist } from './artists.data';
import { ITrack } from './tracks.data';

export interface IFavorites {
  artists: IArtist[]; // favorite artists ids
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids
}

export const favoritesData: IFavorites = {
  artists: [],
  albums: [],
  tracks: [],
};
