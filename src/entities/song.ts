export type Song = {
  id: string;
  title: string;
  author: string;
  year: number;
};

export type SongCreateDto = Omit<Song, 'id'>;

export type SongUpdateDto = {
  title?: string;
  author?: string;
  year?: number;
};
