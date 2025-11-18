import { Book } from './Book';

export class Loan {
  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly bookId: string,
    readonly loanDate: Date,
    readonly returnDate?: Date,
    readonly book?: Book
  ) {}

  static create(
    id: string,
    userId: string,
    bookId: string,
    loanDate: Date,
    returnDate?: Date,
    book?: Book
  ): Loan {
    return new Loan(id, userId, bookId, loanDate, returnDate, book);
  }

  return(): Loan {
    if (this.returnDate) {
      throw new Error('Loan already returned');
    }
    return new Loan(this.id, this.userId, this.bookId, this.loanDate, new Date());
  }
}
