export type Song = {
  id: string;
  title: string;
  author: string;
  year: number;
};

export type SongCreateDto = {
  title: string;
  author: string;
  year: number;
};

export type SongUpdateDto = {
  title?: string;
  author?: string;
  year?: number;
};
