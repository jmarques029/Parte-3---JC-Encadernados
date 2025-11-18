import { Book } from '../entities/Book';
import { IBookRepository } from '../repositories/IBookRepository';
import { Title } from '../value-objects/Title';
import { Author } from '../value-objects/Author';
import { BindingType } from '../value-objects/BindingType';
import { CoverType } from '../value-objects/CoverType';
import { Photo } from '../value-objects/Photo';

export class RegisterBook {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(params: {
    title: string;
    author: string;
    bindingType: string;
    pages: number;
    coverType: string;
    price: number;
    photoUrl: string;
    userId: string;
  }): Promise<Book> {
    const { title, author, bindingType, pages, coverType, price, photoUrl, userId } = params;

    const book = Book.create(
      crypto.randomUUID(),
      Title.create(title),
      Author.create(author),
      BindingType.create(bindingType),
      pages,
      CoverType.create(coverType),
      price,
      Photo.create(photoUrl),
      userId
    );

    await this.bookRepository.save(book);

    return book;
  }
}
