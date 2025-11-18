import { ILoanRepository } from '../domain/repositories/ILoanRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IBookRepository } from '../domain/repositories/IBookRepository';
import { BorrowBook } from '../domain/use-cases/BorrowBook';
import { ReturnBook } from '../domain/use-cases/ReturnBook';
import { MockLoanRepository } from '../infra/mocks/MockLoanRepository';
import { MockUserRepository } from '../infra/mocks/MockUserRepository';
import { MockBookRepository } from '../infra/mocks/MockBookRepository';

export function makeLoanUseCases() {
  const loanRepository: ILoanRepository = MockLoanRepository.getInstance();
  const userRepository: IUserRepository = MockUserRepository.getInstance();
  const bookRepository: IBookRepository = MockBookRepository.getInstance();

  const borrowBook = new BorrowBook(
    loanRepository,
    userRepository,
    bookRepository
  );
  const returnBook = new ReturnBook(loanRepository);

  return {
    borrowBook,
    returnBook,
    findLoansByUser: {
      execute: async (params: { userId: string }) => loanRepository.findByUserId(params.userId)
    }
  };
}
