import { Book } from '../entities/Book';
import { IBookRepository } from '../repositories/IBookRepository';
import { Title } from '../value-objects/Title';
import { Author } from '../value-objects/Author';
import { BindingType } from '../value-objects/BindingType';
import { CoverType } from '../value-objects/CoverType';
import { Photo } from '../value-objects/Photo';

export class UpdateBook {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(params: {
    id: string;
    title?: string;
    author?: string;
    bindingType?: string;
    pages?: number;
    coverType?: string;
    price?: number;
    photoUrl?: string;
    userId?: string;
  }): Promise<Book> {
    const { id, title, author, bindingType, pages, coverType, price, photoUrl, userId } = params;

    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error('Book not found');
    }

    const newTitle = title ? Title.create(title) : book.title;
    const newAuthor = author ? Author.create(author) : book.author;
    const newBindingType = bindingType ? BindingType.create(bindingType) : book.bindingType;
    const newPages = pages || book.pages;
    const newCoverType = coverType ? CoverType.create(coverType) : book.coverType;
    const newPrice = price !== undefined ? price : book.price;
    const newPhoto = photoUrl ? Photo.create(photoUrl) : book.photo;

    const updatedBook = Book.create(
      book.id,
      newTitle,
      newAuthor,
      newBindingType,
      newPages,
      newCoverType,
      newPrice,
      newPhoto,
      userId
    );

    await this.bookRepository.update(updatedBook);

    return updatedBook;
  }
}
