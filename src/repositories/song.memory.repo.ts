import fs from 'fs';
import path from 'path';
import {
  type SongCreateDto,
  type Song,
  type SongUpdateDto,
} from '../entities/song';
import createDebug from 'debug';
import { fileURLToPath } from 'url';

const debug = createDebug('W6E:repository:song');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line @typescript-eslint/naming-convention
const JSON_FILE_PATH = path.join(__dirname, 'songs.db.json');

export class SongMemoryRepository {
  songs: Song[] = [];

  constructor() {
    debug('Instantiated song memory repository');
    this.loadSongs();
    console.log(this.readAll());
  }

  loadSongs() {
    try {
      const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
      this.songs = JSON.parse(data) as Song[];
    } catch (err) {
      console.error('Error loading songs:', err);
      this.songs = [];
    }
  }

  saveSongs() {
    fs.writeFileSync(
      JSON_FILE_PATH,
      JSON.stringify(this.songs, null, 2),
      'utf8'
    );
  }

  readAll() {
    return this.songs;
  }

  readById(id: string) {
    return this.songs.find((song) => song.id === id);
  }

  create(data: SongCreateDto) {
    const newSong: Song = {
      id: (this.songs.length + 1).toString(),
      title: data.title,
      author: data.author,
      year: data.year,
    };
    this.songs.push(newSong);
    this.saveSongs();
    return newSong;
  }

  update(id: string, data: Partial<SongUpdateDto>) {
    const index = this.songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new Error(`Song ${id} not found`);
    }

    const updatedSong = { ...this.songs[index], ...data };
    this.songs[index] = updatedSong;
    this.saveSongs();
    return updatedSong;
  }

  delete(id: string) {
    const index = this.songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new Error(`Song ${id} not found`);
    }

    const deletedSong = this.songs.splice(index, 1)[0];
    this.saveSongs();
    return deletedSong;
  }
}
