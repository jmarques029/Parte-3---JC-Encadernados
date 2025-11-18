import { IBookRepository } from '../repositories/IBookRepository';

export class DeleteBook {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(params: { id: string }): Promise<void> {
    const { id } = params;

    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error('Book not found');
    }

    await this.bookRepository.delete(id);
  }
}
