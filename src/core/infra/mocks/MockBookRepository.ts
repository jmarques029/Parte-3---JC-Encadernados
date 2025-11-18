import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { Book } from '../../domain/entities/Book';
import { MockUserRepository } from './MockUserRepository';

export class MockBookRepository implements IBookRepository {
  private static instance: MockBookRepository;
  private books: Book[] = [];

  private constructor() {}

  public static getInstance(): MockBookRepository {
    if (!MockBookRepository.instance) {
      MockBookRepository.instance = new MockBookRepository();
    }
    return MockBookRepository.instance;
  }

  async save(book: Book): Promise<void> {
    this.books.push(book);
  }

  async findById(id: string): Promise<Book | null> {
    const book = this.books.find(book => book.id === id) || null;
    if (!book) return null;
    if (book.userId) {
      const user = await MockUserRepository.getInstance().findById(book.userId) || undefined;
      return { ...book, user };
    }
    return book;
  }

  async findAll(): Promise<Book[]> {
    return Promise.all(this.books.map(async (book) => {
      if (book.userId) {
        const user = await MockUserRepository.getInstance().findById(book.userId) || undefined;
        return { ...book, user };
      }
      return { ...book };
    }));
  }

  async update(book: Book): Promise<void> {
    const bookIndex = this.books.findIndex(b => b.id === book.id);
    if (bookIndex !== -1) {
      this.books[bookIndex] = book;
    }
  }

  async delete(id: string): Promise<void> {
    this.books = this.books.filter(book => book.id !== id);
  }

  public reset(): void {
    this.books = [];
  }
}
