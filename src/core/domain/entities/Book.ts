import { Title } from '../value-objects/Title';
import { Author } from '../value-objects/Author';
import { BindingType } from '../value-objects/BindingType';
import { CoverType } from '../value-objects/CoverType';
import { Photo } from '../value-objects/Photo';
import { User } from './User';

export class Book {
  private constructor(
    readonly id: string,
    readonly title: Title,
    readonly author: Author,
    readonly bindingType: BindingType,
    readonly pages: number,
    readonly coverType: CoverType,
    readonly price: number,
    readonly photo: Photo,
    readonly userId?: string,
    readonly user?: User
  ) {}

  static create(
    id: string,
    title: Title,
    author: Author,
    bindingType: BindingType,
    pages: number,
    coverType: CoverType,
    price: number,
    photo: Photo,
    userId?: string,
    user?: User
  ): Book {
    return new Book(id, title, author, bindingType, pages, coverType, price, photo, userId, user);
  }
}
