import { BorrowBook } from '@/core/domain/use-cases/BorrowBook';
import { RegisterBook } from '@/core/domain/use-cases/RegisterBook';
import { RegisterUser } from '@/core/domain/use-cases/RegisterUser';
import { MockLoanRepository } from '@/core/infra/mocks/MockLoanRepository';
import { MockBookRepository } from '@/core/infra/mocks/MockBookRepository';
import { MockUserRepository } from '@/core/infra/mocks/MockUserRepository';

describe('BorrowBook Use Case', () => {
  let borrowBook: BorrowBook;
  let registerBook: RegisterBook;
  let registerUser: RegisterUser;
  let loanRepository: MockLoanRepository;
  let bookRepository: MockBookRepository;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    loanRepository = MockLoanRepository.getInstance();
    bookRepository = MockBookRepository.getInstance();
    userRepository = MockUserRepository.getInstance();

    loanRepository.reset();
    bookRepository.reset();
    userRepository.reset();

    borrowBook = new BorrowBook(loanRepository, userRepository, bookRepository);
    registerBook = new RegisterBook(bookRepository);
    registerUser = new RegisterUser(userRepository);
  });

  it('should borrow a book', async () => {
    const user = await registerUser.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const book = await registerBook.execute({
      title: 'Test Book',
      author: 'Test Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: user.id,
    });

    const loan = await borrowBook.execute({
      userId: user.id,
      bookId: book.id,
    });

    expect(loan).toBeDefined();
    expect(loan.userId).toBe(user.id);
    expect(loan.bookId).toBe(book.id);
    expect(loan.returnDate).toBeUndefined();
  });

  it('should throw error when user not found', async () => {
    const book = await registerBook.execute({
      title: 'Test Book',
      author: 'Test Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: 'user-1',
    });

    await expect(
      borrowBook.execute({
        userId: 'nonexistent-user',
        bookId: book.id,
      })
    ).rejects.toThrow('User not found');
  });

  it('should throw error when book not found', async () => {
    const user = await registerUser.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    });

    await expect(
      borrowBook.execute({
        userId: user.id,
        bookId: 'nonexistent-book',
      })
    ).rejects.toThrow('Book not found');
  });

  it('should throw error when book is already on loan', async () => {
    const user = await registerUser.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const book = await registerBook.execute({
      title: 'Test Book',
      author: 'Test Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: user.id,
    });

    await borrowBook.execute({
      userId: user.id,
      bookId: book.id,
    });

    await expect(
      borrowBook.execute({
        userId: user.id,
        bookId: book.id,
      })
    ).rejects.toThrow('Book is already on loan');
  });
});
