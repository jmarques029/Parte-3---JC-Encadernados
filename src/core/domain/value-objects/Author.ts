export class Author {
  private constructor(readonly value: string) {}

  static create(author: string): Author {
    if (!this.validate(author)) {
      throw new Error('Invalid author');
    }
    return new Author(author);
  }

  private static validate(author: string): boolean {
    return author.length > 0;
  }
}
