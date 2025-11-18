import { Loan } from '@/core/domain/entities/Loan';

describe('Loan Entity', () => {
  it('should create a loan with valid data', () => {
    const loanDate = new Date('2023-01-01');
    const loan = Loan.create(
      '1',
      'user-1',
      'book-1',
      loanDate
    );

    expect(loan).toBeDefined();
    expect(loan.id).toBe('1');
    expect(loan.userId).toBe('user-1');
    expect(loan.bookId).toBe('book-1');
    expect(loan.loanDate).toBe(loanDate);
    expect(loan.returnDate).toBeUndefined();
  });

  it('should create a loan with return date', () => {
    const loanDate = new Date('2023-01-01');
    const returnDate = new Date('2023-01-15');
    const loan = Loan.create(
      '1',
      'user-1',
      'book-1',
      loanDate,
      returnDate
    );

    expect(loan.returnDate).toBe(returnDate);
  });

  it('should return a loan', () => {
    const loanDate = new Date('2023-01-01');
    const loan = Loan.create(
      '1',
      'user-1',
      'book-1',
      loanDate
    );

    const returnedLoan = loan.return();

    expect(returnedLoan.returnDate).toBeDefined();
    expect(returnedLoan.returnDate).toBeInstanceOf(Date);
  });

  it('should throw error when returning already returned loan', () => {
    const loanDate = new Date('2023-01-01');
    const returnDate = new Date('2023-01-15');
    const loan = Loan.create(
      '1',
      'user-1',
      'book-1',
      loanDate,
      returnDate
    );

    expect(() => {
      loan.return();
    }).toThrow('Loan already returned');
  });

  it('should create multiple distinct loans', () => {
    const loan1 = Loan.create(
      '1',
      'user-1',
      'book-1',
      new Date('2023-01-01')
    );

    const loan2 = Loan.create(
      '2',
      'user-2',
      'book-2',
      new Date('2023-01-02')
    );

    expect(loan1.id).not.toBe(loan2.id);
    expect(loan1.userId).not.toBe(loan2.userId);
    expect(loan1.bookId).not.toBe(loan2.bookId);
  });
});
