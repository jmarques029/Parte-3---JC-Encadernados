import { IBookRepository } from '../domain/repositories/IBookRepository';
import { DeleteBook } from '../domain/use-cases/DeleteBook';
import { FindBook } from '../domain/use-cases/FindBook';
import { FindAllBook } from '../domain/use-cases/FindAllBook';
import { RegisterBook } from '../domain/use-cases/RegisterBook';
import { UpdateBook } from '../domain/use-cases/UpdateBook';
import { MockBookRepository } from '../infra/mocks/MockBookRepository';

export function makeBookUseCases() {
  const bookRepository: IBookRepository = MockBookRepository.getInstance();

  const registerBook = new RegisterBook(bookRepository);
  const updateBook = new UpdateBook(bookRepository);
  const deleteBook = new DeleteBook(bookRepository);
  const findBook = new FindBook(bookRepository);
  const findAllBook = new FindAllBook(bookRepository);

  return {
    registerBook,
    updateBook,
    deleteBook,
    findBook,
    findAllBook
  };
}
