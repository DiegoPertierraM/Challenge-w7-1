/* eslint-disable @typescript-eslint/member-ordering */
import { readFile, writeFile } from 'fs/promises';
import {
  type SongCreateDto,
  type Song,
  type SongUpdateDto,
} from '../entities/song';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
const debug = createDebug('W7E:repository:song');

export class SongsFsRepo {
  songs: Song[] = [];

  constructor() {
    debug('Instantiated song fs repository');
  }

  private async load(): Promise<Song[]> {
    const data = await readFile('songs.db.json', 'utf-8');
    return JSON.parse(data) as Song[];
  }

  private async save(songs: Song[]) {
    await writeFile('songs.db.json', JSON.stringify(songs, null, 2));
  }

  async readAll() {
    const songs = await this.load();
    return songs;
  }

  async readById(id: string) {
    const songs = await this.load();
    const song = songs.find((song) => song.id === id);

    if (!song) {
      throw new HttpError(404, 'Not Found', `Song ${id} not found`);
    }

    return song;
  }

  async create(data: SongCreateDto) {
    const newSong: Song = {
      id: crypto.randomUUID(),
      ...data,
    };
    let songs = await this.load();
    songs = [...songs, newSong];
    await this.save(songs);
    return newSong;
  }

  async update(id: string, data: Partial<SongUpdateDto>) {
    let songs = await this.load();
    const song = songs.find((song) => song.id === id);

    if (!song) {
      throw new HttpError(404, 'Not Found', `Song ${id} not found`);
    }

    const newSong: Song = { ...song, ...data };
    songs = songs.map((song) => (song.id === id ? newSong : song));
    await this.save(songs);
    return newSong;
  }

  async delete(id: string) {
    let songs = await this.load();
    const song = songs.find((song) => song.id === id);

    if (!song) {
      throw new HttpError(404, 'Not Found', `Song ${id} not found`);
    }

    songs = songs.filter((song) => song.id !== id);
    await this.save(songs);
    return song;
  }
}
