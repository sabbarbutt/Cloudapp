import {Playlist} from '../models/playlist.model';
import {Injectable} from '@angular/core';
import {SoundcloudCollection} from '../../shared/collections/soundcloud';

export class Playlists<TModel extends Playlist> extends SoundcloudCollection<TModel> {
  endpoint = '/playlists';
  model: any = Playlist;
}
