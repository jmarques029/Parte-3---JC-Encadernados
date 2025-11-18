import { Book } from '../entities/Book';

export interface IBookRepository {
  save(book: Book): Promise<void>;
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  update(book: Book): Promise<void>;
  delete(id: string): Promise<void>;
}
