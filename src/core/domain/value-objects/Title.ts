export class Title {
  private constructor(readonly value: string) {}

  static create(title: string): Title {
    if (!this.validate(title)) {
      throw new Error('Invalid title');
    }
    return new Title(title);
  }

  private static validate(title: string): boolean {
    return title.length > 0;
  }
}
