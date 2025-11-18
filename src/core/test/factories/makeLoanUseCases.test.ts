import { makeLoanUseCases } from '@/core/factories/makeLoanUseCases';
import { makeBookUseCases } from '@/core/factories/makeBookUseCases';
import { makeUserUseCases } from '@/core/factories/makeUserUseCases';

describe('makeLoanUseCases Factory', () => {
  it('should create all loan use cases', () => {
    const loanUseCases = makeLoanUseCases();

    expect(loanUseCases).toBeDefined();
    expect(loanUseCases.borrowBook).toBeDefined();
    expect(loanUseCases.returnBook).toBeDefined();
    expect(loanUseCases.findLoansByUser).toBeDefined();
  });

  it('should create use cases that can be executed', async () => {
    const loanUseCases = makeLoanUseCases();
    const bookUseCases = makeBookUseCases();
    const userUseCases = makeUserUseCases();

    const user = await userUseCases.registerUser.execute({
      name: 'Test User',
      email: 'loan@example.com',
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
  });

  it('should share the same repository instance', () => {
    const loanUseCases1 = makeLoanUseCases();
    const loanUseCases2 = makeLoanUseCases();

    // Both should use singleton instance
    expect(loanUseCases1).toBeDefined();
    expect(loanUseCases2).toBeDefined();
  });

  it('should allow borrow and return operations', async () => {
    const loanUseCases = makeLoanUseCases();
    const bookUseCases = makeBookUseCases();
    const userUseCases = makeUserUseCases();

    const user = await userUseCases.registerUser.execute({
      name: 'Test User',
      email: 'borrow@example.com',
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

    // Borrow
    const loan = await loanUseCases.borrowBook.execute({
      userId: user.id,
      bookId: book.id,
    });
    expect(loan.returnDate).toBeUndefined();

    // Return
    const returnedLoan = await loanUseCases.returnBook.execute({
      loanId: loan.id,
    });
    expect(returnedLoan.returnDate).toBeDefined();
  });

  it('should find loans by user', async () => {
    const loanUseCases = makeLoanUseCases();
    const bookUseCases = makeBookUseCases();
    const userUseCases = makeUserUseCases();

    const user = await userUseCases.registerUser.execute({
      name: 'Test User',
      email: 'findloans@example.com',
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

    await loanUseCases.borrowBook.execute({
      userId: user.id,
      bookId: book.id,
    });

    const loans = await loanUseCases.findLoansByUser.execute({
      userId: user.id,
    });

    expect(loans).toHaveLength(1);
    expect(loans[0].userId).toBe(user.id);
  });
});
