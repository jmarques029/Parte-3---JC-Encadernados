import { Loan } from '../entities/Loan';
import { ILoanRepository } from '../repositories/ILoanRepository';
import { IBookRepository } from '../repositories/IBookRepository';
import { IUserRepository } from '../repositories/IUserRepository';

export class BorrowBook {
  constructor(
    private readonly loanRepository: ILoanRepository,
    private readonly userRepository: IUserRepository,
    private readonly bookRepository: IBookRepository
  ) {}

  async execute(params: {
    userId: string;
    bookId: string;
  }): Promise<Loan> {
    const { userId, bookId } = params;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    const currentLoan = await this.loanRepository.findCurrentLoanOfBook(
      bookId
    );

    if (currentLoan) {
      throw new Error('Book is already on loan');
    }

    const loan = Loan.create(
      crypto.randomUUID(),
      userId,
      bookId,
      new Date()
    );

    await this.loanRepository.save(loan);

    return loan;
  }
}
