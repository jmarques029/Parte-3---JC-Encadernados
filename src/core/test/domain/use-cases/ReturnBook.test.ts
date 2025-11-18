import { ReturnBook } from '@/core/domain/use-cases/ReturnBook';
import { BorrowBook } from '@/core/domain/use-cases/BorrowBook';
import { RegisterBook } from '@/core/domain/use-cases/RegisterBook';
import { RegisterUser } from '@/core/domain/use-cases/RegisterUser';
import { MockLoanRepository } from '@/core/infra/mocks/MockLoanRepository';
import { MockBookRepository } from '@/core/infra/mocks/MockBookRepository';
import { MockUserRepository } from '@/core/infra/mocks/MockUserRepository';

describe('ReturnBook Use Case', () => {
  let returnBook: ReturnBook;
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

    returnBook = new ReturnBook(loanRepository);
    borrowBook = new BorrowBook(loanRepository, userRepository, bookRepository);
    registerBook = new RegisterBook(bookRepository);
    registerUser = new RegisterUser(userRepository);
  });

  it('should return a borrowed book', async () => {
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

    const returnedLoan = await returnBook.execute({
      loanId: loan.id,
    });

    expect(returnedLoan.returnDate).toBeDefined();
    expect(returnedLoan.id).toBe(loan.id);
  });

  it('should throw error when loan not found', async () => {
    await expect(
      returnBook.execute({
        loanId: 'nonexistent-loan',
      })
    ).rejects.toThrow('Loan not found');
  });

  it('should throw error when returning already returned loan', async () => {
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

    await returnBook.execute({
      loanId: loan.id,
    });

    await expect(
      returnBook.execute({
        loanId: loan.id,
      })
    ).rejects.toThrow('Loan already returned');
  });
});
