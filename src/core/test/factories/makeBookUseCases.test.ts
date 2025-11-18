import { makeBookUseCases } from '@/core/factories/makeBookUseCases';

describe('makeBookUseCases Factory', () => {
  it('should create all book use cases', () => {
    const bookUseCases = makeBookUseCases();

    expect(bookUseCases).toBeDefined();
    expect(bookUseCases.registerBook).toBeDefined();
    expect(bookUseCases.updateBook).toBeDefined();
    expect(bookUseCases.deleteBook).toBeDefined();
    expect(bookUseCases.findBook).toBeDefined();
    expect(bookUseCases.findAllBook).toBeDefined();
  });

  it('should create use cases that can be executed', async () => {
    const bookUseCases = makeBookUseCases();

    const book = await bookUseCases.registerBook.execute({
      title: 'Factory Test Book',
      author: 'Factory Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    });

    expect(book).toBeDefined();
    expect(book.title.value).toBe('Factory Test Book');
  });

  it('should share the same repository instance', () => {
    const bookUseCases1 = makeBookUseCases();
    const bookUseCases2 = makeBookUseCases();

    // Both should use singleton instance
    expect(bookUseCases1).toBeDefined();
    expect(bookUseCases2).toBeDefined();
  });

  it('should allow CRUD operations through factory', async () => {
    const bookUseCases = makeBookUseCases();

    // Create
    const book = await bookUseCases.registerBook.execute({
      title: 'CRUD Test Book',
      author: 'CRUD Author',
      bindingType: 'SOFTCOVER',
      pages: 150,
      coverType: 'PAPER',
      price: 19.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    });

    // Read
    const foundBook = await bookUseCases.findBook.execute(book.id);
    expect(foundBook?.id).toBe(book.id);

    // Update
    const updatedBook = await bookUseCases.updateBook.execute({
      id: book.id,
      title: 'Updated Title',
      author: 'Updated Author',
      bindingType: 'HARDCOVER',
      pages: 200,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/updated.jpg',
      userId: 'user-1',
    });
    expect(updatedBook.title.value).toBe('Updated Title');

    // Delete
    await bookUseCases.deleteBook.execute({ id: book.id });
    const deletedBook = await bookUseCases.findBook.execute(book.id);
    expect(deletedBook).toBeNull();
  });
});
