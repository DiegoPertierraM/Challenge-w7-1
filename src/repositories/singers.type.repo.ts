import { type Singer, type SingerCreateDto } from '../entities/singer';

export type SingersRepo = {
  readAll(): Promise<Singer[]>;
  readById(id: string): Promise<Singer>;
  create(data: SingerCreateDto): Promise<SingerCreateDto>;
  update(id: string, data: Partial<Singer>): Promise<Singer>;
  delete(id: string): Promise<Singer>;
};
