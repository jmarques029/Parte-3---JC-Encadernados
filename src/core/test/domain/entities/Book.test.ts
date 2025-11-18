import { Book } from '@/core/domain/entities/Book';
import { Title } from '@/core/domain/value-objects/Title';
import { Author } from '@/core/domain/value-objects/Author';
import { BindingType } from '@/core/domain/value-objects/BindingType';
import { CoverType } from '@/core/domain/value-objects/CoverType';
import { Photo } from '@/core/domain/value-objects/Photo';

describe('Book Entity', () => {
  it('should create a book with valid data', () => {
    const book = Book.create(
      '1',
      Title.create('Test Book'),
      Author.create('Test Author'),
      BindingType.create('HARDCOVER'),
      100,
      CoverType.create('LEATHER'),
      29.99,
      Photo.create('https://example.com/book.jpg')
    );

    expect(book).toBeDefined();
    expect(book.id).toBe('1');
    expect(book.title.value).toBe('Test Book');
    expect(book.author.value).toBe('Test Author');
    expect(book.bindingType.value).toBe('HARDCOVER');
    expect(book.pages).toBe(100);
    expect(book.coverType.value).toBe('LEATHER');
    expect(book.price).toBe(29.99);
    expect(book.photo.url).toBe('https://example.com/book.jpg');
  });

  it('should create a book with userId', () => {
    const book = Book.create(
      '1',
      Title.create('Test Book'),
      Author.create('Test Author'),
      BindingType.create('SOFTCOVER'),
      200,
      CoverType.create('PAPER'),
      19.99,
      Photo.create('https://example.com/book.jpg'),
      'user-1'
    );

    expect(book.userId).toBe('user-1');
  });

  it('should create books with different binding types', () => {
    const hardcoverBook = Book.create(
      '1',
      Title.create('Hardcover Book'),
      Author.create('Author'),
      BindingType.create('HARDCOVER'),
      100,
      CoverType.create('LEATHER'),
      29.99,
      Photo.create('https://example.com/book1.jpg')
    );

    const softcoverBook = Book.create(
      '2',
      Title.create('Softcover Book'),
      Author.create('Author'),
      BindingType.create('SOFTCOVER'),
      100,
      CoverType.create('PAPER'),
      19.99,
      Photo.create('https://example.com/book2.jpg')
    );

    const spiralBook = Book.create(
      '3',
      Title.create('Spiral Book'),
      Author.create('Author'),
      BindingType.create('SPIRAL'),
      100,
      CoverType.create('CLOTH'),
      24.99,
      Photo.create('https://example.com/book3.jpg')
    );

    expect(hardcoverBook.bindingType.value).toBe('HARDCOVER');
    expect(softcoverBook.bindingType.value).toBe('SOFTCOVER');
    expect(spiralBook.bindingType.value).toBe('SPIRAL');
  });

  it('should handle different cover types', () => {
    const leatherBook = Book.create(
      '1',
      Title.create('Leather Book'),
      Author.create('Author'),
      BindingType.create('HARDCOVER'),
      100,
      CoverType.create('LEATHER'),
      29.99,
      Photo.create('https://example.com/book.jpg')
    );

    const clothBook = Book.create(
      '2',
      Title.create('Cloth Book'),
      Author.create('Author'),
      BindingType.create('HARDCOVER'),
      100,
      CoverType.create('CLOTH'),
      24.99,
      Photo.create('https://example.com/book.jpg')
    );

    const paperBook = Book.create(
      '3',
      Title.create('Paper Book'),
      Author.create('Author'),
      BindingType.create('SOFTCOVER'),
      100,
      CoverType.create('PAPER'),
      19.99,
      Photo.create('https://example.com/book.jpg')
    );

    expect(leatherBook.coverType.value).toBe('LEATHER');
    expect(clothBook.coverType.value).toBe('CLOTH');
    expect(paperBook.coverType.value).toBe('PAPER');
  });
});
