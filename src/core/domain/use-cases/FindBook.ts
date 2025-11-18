import { Book } from '../entities/Book';
import { IBookRepository } from '../repositories/IBookRepository';

export class FindBook {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(id: string): Promise<Book | null> {
    return this.bookRepository.findById(id);
  }
}
