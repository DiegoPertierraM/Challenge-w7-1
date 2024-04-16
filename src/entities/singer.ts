export type Singer = {
  id: string;
  name: string;
  band: string;
  age: number;
};

export type SingerCreateDto = Omit<Singer, 'id'>;

export type SingerUpdateDto = {
  name?: string;
  band?: string;
  age?: number;
};
