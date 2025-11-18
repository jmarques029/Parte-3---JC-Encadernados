import { FindAllBook } from '@/core/domain/use-cases/FindAllBook';
import { RegisterBook } from '@/core/domain/use-cases/RegisterBook';
import { MockBookRepository } from '@/core/infra/mocks/MockBookRepository';

describe('FindAllBook Use Case', () => {
  let findAllBook: FindAllBook;
  let registerBook: RegisterBook;
  let bookRepository: MockBookRepository;

  beforeEach(() => {
    bookRepository = MockBookRepository.getInstance();
    bookRepository.reset();
    findAllBook = new FindAllBook(bookRepository);
    registerBook = new RegisterBook(bookRepository);
  });

  it('should return all books', async () => {
    await registerBook.execute({
      title: 'Book 1',
      author: 'Author 1',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book1.jpg',
      userId: 'user-1',
    });

    await registerBook.execute({
      title: 'Book 2',
      author: 'Author 2',
      bindingType: 'SOFTCOVER',
      pages: 200,
      coverType: 'PAPER',
      price: 19.99,
      photoUrl: 'https://example.com/book2.jpg',
      userId: 'user-1',
    });

    const books = await findAllBook.execute();

    expect(books).toHaveLength(2);
    expect(books[0].title.value).toBe('Book 1');
    expect(books[1].title.value).toBe('Book 2');
  });

  it('should return empty array when no books exist', async () => {
    const books = await findAllBook.execute();

    expect(books).toEqual([]);
    expect(books).toHaveLength(0);
  });

  it('should return books with user information', async () => {
    await registerBook.execute({
      title: 'User Book',
      author: 'Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    });

    const books = await findAllBook.execute();

    expect(books[0].userId).toBe('user-1');
    expect(books[0].user).toBeDefined();
  });
});
