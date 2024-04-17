import { type User } from '@prisma/client';

export type SongSingle = {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
};

export type SongSingleCreateDto = Omit<SongSingle, 'id'>;

export type Song = {
  id: string;
  title: string;
  author: Partial<User>;
  genre: string;
  description: string;
};

export type SongCreateDto = {
  id: string;
  title: string;
  authorId: string;
  genre: string;
  description?: string;
};
