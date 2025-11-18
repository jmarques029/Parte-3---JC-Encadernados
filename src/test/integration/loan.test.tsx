import { makeLoanUseCases } from '@/core/factories/makeLoanUseCases';
import { makeBookUseCases } from '@/core/factories/makeBookUseCases';
import { makeUserUseCases } from '@/core/factories/makeUserUseCases';
import { MockLoanRepository } from '@/core/infra/mocks/MockLoanRepository';
import { MockBookRepository } from '@/core/infra/mocks/MockBookRepository';
import { MockUserRepository } from '@/core/infra/mocks/MockUserRepository';

describe('Loan Integration Tests', () => {
  let loanUseCases: ReturnType<typeof makeLoanUseCases>;
  let bookUseCases: ReturnType<typeof makeBookUseCases>;
  let userUseCases: ReturnType<typeof makeUserUseCases>;
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

    loanUseCases = makeLoanUseCases();
    bookUseCases = makeBookUseCases();
    userUseCases = makeUserUseCases();
  });

  it('should borrow a book', async () => {
    const user = await userUseCases.registerUser.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const book = await bookUseCases.registerBook.execute({
      title: 'Test Book',
      author: 'Test Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: user.id,
    });

    const loan = await loanUseCases.borrowBook.execute({
      userId: user.id,
      bookId: book.id,
    });

    expect(loan).toBeDefined();
    expect(loan.userId).toBe(user.id);
    expect(loan.bookId).toBe(book.id);
    expect(loan.returnDate).toBeUndefined();
  });

  it('should return a borrowed book', async () => {
    const user = await userUseCases.registerUser.execute({
      name: 'Test User',
      email: 'return@example.com',
      password: 'Password123!',
    });

    const book = await bookUseCases.registerBook.execute({
      title: 'Book to Return',
      author: 'Test Author',
      bindingType: 'SOFTCOVER',
      pages: 150,
      coverType: 'PAPER',
      price: 19.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: user.id,
    });

    const loan = await loanUseCases.borrowBook.execute({
      userId: user.id,
      bookId: book.id,
    });

    const returnedLoan = await loanUseCases.returnBook.execute({
      loanId: loan.id,
    });

    expect(returnedLoan.returnDate).toBeDefined();
    expect(returnedLoan.id).toBe(loan.id);
  });

  it('should throw error when borrowing already loaned book', async () => {
    const user = await userUseCases.registerUser.execute({
      name: 'User 1',
      email: 'user1@example.com',
      password: 'Password123!',
    });

    const book = await bookUseCases.registerBook.execute({
      title: 'Already Loaned Book',
      author: 'Test Author',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book.jpg',
      userId: user.id,
    });

    await loanUseCases.borrowBook.execute({
      userId: user.id,
      bookId: book.id,
    });

    await expect(
      loanUseCases.borrowBook.execute({
        userId: user.id,
        bookId: book.id,
      })
    ).rejects.toThrow('Book is already on loan');
  });

  it('should find loans by user id', async () => {
    const user = await userUseCases.registerUser.execute({
      name: 'Test User',
      email: 'loans@example.com',
      password: 'Password123!',
    });

    const book1 = await bookUseCases.registerBook.execute({
      title: 'Book 1',
      author: 'Author 1',
      bindingType: 'HARDCOVER',
      pages: 100,
      coverType: 'LEATHER',
      price: 29.99,
      photoUrl: 'https://example.com/book1.jpg',
      userId: user.id,
    });

    const book2 = await bookUseCases.registerBook.execute({
      title: 'Book 2',
      author: 'Author 2',
      bindingType: 'SOFTCOVER',
      pages: 200,
      coverType: 'PAPER',
      price: 19.99,
      photoUrl: 'https://example.com/book2.jpg',
      userId: user.id,
    });

    await loanUseCases.borrowBook.execute({
      userId: user.id,
      bookId: book1.id,
    });

    await loanUseCases.borrowBook.execute({
      userId: user.id,
      bookId: book2.id,
    });

    const loans = await loanUseCases.findLoansByUser.execute({ userId: user.id });

    expect(loans).toHaveLength(2);
  });
});
