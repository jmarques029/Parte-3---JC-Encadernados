import { makeBookUseCases } from '@/core/factories/makeBookUseCases';
import { MockBookRepository } from '@/core/infra/mocks/MockBookRepository';

describe('Book CRUD Integration Tests', () => {
  let bookRepository: MockBookRepository;
  let bookUseCases: ReturnType<typeof makeBookUseCases>;

  beforeEach(() => {
    bookRepository = MockBookRepository.getInstance();
    bookRepository.reset();
    bookUseCases = makeBookUseCases();
  });

  it('should register a new book', async () => {
    const bookData = {
      title: 'Integration Test Book',
      author: 'Test Author',
      bindingType: 'HARDCOVER',
      pages: 150,
      coverType: 'LEATHER',
      price: 39.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    };

    const book = await bookUseCases.registerBook.execute(bookData);

    expect(book).toBeDefined();
    expect(book.title.value).toBe('Integration Test Book');
    expect(book.author.value).toBe('Test Author');
    expect(book.pages).toBe(150);
  });

  it('should find all books', async () => {
    await bookUseCases.registerBook.execute({
      title: 'Book 1',
      author: 'Author 1',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book1.jpg',
      userId: 'user-1',
    });

    await bookUseCases.registerBook.execute({
      title: 'Book 2',
      author: 'Author 2',
      bindingType: 'SOFTCOVER',
      pages: 200,
      coverType: 'PAPER',
      price: 19.99,
      photoUrl: 'https://example.com/book2.jpg',
      userId: 'user-1',
    });

    const books = await bookUseCases.findAllBook.execute();

    expect(books).toHaveLength(2);
    expect(books[0].title.value).toBe('Book 1');
    expect(books[1].title.value).toBe('Book 2');
  });

  it('should find a specific book by id', async () => {
    const createdBook = await bookUseCases.registerBook.execute({
      title: 'Specific Book',
      author: 'Specific Author',
      bindingType: 'SPIRAL',
      pages: 75,
      coverType: 'CLOTH',
      price: 24.99,
      photoUrl: 'https://example.com/specific.jpg',
      userId: 'user-1',
    });

    const foundBook = await bookUseCases.findBook.execute(createdBook.id);

    expect(foundBook).toBeDefined();
    expect(foundBook?.title.value).toBe('Specific Book');
    expect(foundBook?.id).toBe(createdBook.id);
  });

  it('should update a book', async () => {
    const createdBook = await bookUseCases.registerBook.execute({
      title: 'Original Title',
      author: 'Original Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/original.jpg',
      userId: 'user-1',
    });

    const updatedBook = await bookUseCases.updateBook.execute({
      id: createdBook.id,
      title: 'Updated Title',
      author: 'Updated Author',
      bindingType: 'SOFTCOVER',
      pages: 150,
      coverType: 'PAPER',
      price: 34.99,
      photoUrl: 'https://example.com/updated.jpg',
      userId: 'user-1',
    });

    expect(updatedBook.title.value).toBe('Updated Title');
    expect(updatedBook.author.value).toBe('Updated Author');
    expect(updatedBook.pages).toBe(150);
  });

  it('should delete a book', async () => {
    const createdBook = await bookUseCases.registerBook.execute({
      title: 'To Delete',
      author: 'Delete Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/delete.jpg',
      userId: 'user-1',
    });

    await bookUseCases.deleteBook.execute({ id: createdBook.id });

    const foundBook = await bookUseCases.findBook.execute(createdBook.id);
    expect(foundBook).toBeNull();
  });

  it('should throw error when finding non-existent book', async () => {
    const foundBook = await bookUseCases.findBook.execute('non-existent-id');
    expect(foundBook).toBeNull();
  });
});
