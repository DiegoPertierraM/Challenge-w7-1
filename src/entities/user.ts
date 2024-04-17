import { type Song } from './song';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  role: 'admin' | 'user' | 'guest';
  // eslint-disable-next-line @typescript-eslint/array-type
  songs: Partial<Song>[];
};

export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
  birthDateString: string;
};

export type UserUpdateDto = Partial<UserCreateDto>;
