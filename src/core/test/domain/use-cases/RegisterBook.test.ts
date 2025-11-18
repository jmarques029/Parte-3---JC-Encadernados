import { RegisterBook } from '@/core/domain/use-cases/RegisterBook';
import { MockBookRepository } from '@/core/infra/mocks/MockBookRepository';

describe('RegisterBook Use Case', () => {
  let registerBook: RegisterBook;
  let bookRepository: MockBookRepository;

  beforeEach(() => {
    bookRepository = MockBookRepository.getInstance();
    bookRepository.reset();
    registerBook = new RegisterBook(bookRepository);
  });

  it('should register a new book', async () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    };

    const book = await registerBook.execute(bookData);

    expect(book).toBeDefined();
    expect(book.title.value).toBe('Test Book');
    expect(book.author.value).toBe('Test Author');
    expect(book.bindingType.value).toBe('HARDCOVER');
    expect(book.pages).toBe(100);
    expect(book.coverType.value).toBe('LEATHER');
    expect(book.price).toBe(29.99);
    expect(book.photo.url).toBe('https://example.com/book.jpg');
    expect(book.userId).toBe('user-1');
  });

  it('should create multiple books', async () => {
    const book1 = await registerBook.execute({
      title: 'Book 1',
      author: 'Author 1',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book1.jpg',
      userId: 'user-1',
    });

    const book2 = await registerBook.execute({
      title: 'Book 2',
      author: 'Author 2',
      bindingType: 'SOFTCOVER',
      pages: 200,
      coverType: 'PAPER',
      price: 19.99,
      photoUrl: 'https://example.com/book2.jpg',
      userId: 'user-1',
    });

    expect(book1.id).not.toBe(book2.id);
    expect(book1.title.value).not.toBe(book2.title.value);
  });

  it('should create books with different binding types', async () => {
    const hardcoverBook = await registerBook.execute({
      title: 'Hardcover Book',
      author: 'Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    });

    const softcoverBook = await registerBook.execute({
      title: 'Softcover Book',
      author: 'Author',
      bindingType: 'SOFTCOVER',
      pages: 100,
      coverType: 'PAPER',
      price: 19.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    });

    const spiralBook = await registerBook.execute({
      title: 'Spiral Book',
      author: 'Author',
      bindingType: 'SPIRAL',
      pages: 100,
      coverType: 'CLOTH',
      price: 24.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    });

    expect(hardcoverBook.bindingType.value).toBe('HARDCOVER');
    expect(softcoverBook.bindingType.value).toBe('SOFTCOVER');
    expect(spiralBook.bindingType.value).toBe('SPIRAL');
  });
});
