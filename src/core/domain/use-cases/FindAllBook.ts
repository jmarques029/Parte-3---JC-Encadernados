import { Book } from '../entities/Book';
import { IBookRepository } from '../repositories/IBookRepository';

export class FindAllBook {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }
}
