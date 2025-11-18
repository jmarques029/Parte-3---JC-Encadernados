export enum BindingTypeEnum {
  HARDCOVER = 'HARDCOVER',
  SOFTCOVER = 'SOFTCOVER',
  SPIRAL = 'SPIRAL'
}

export class BindingType {
  private constructor(readonly value: BindingTypeEnum) {}

  static create(type: string): BindingType {
    const upperType = type.toUpperCase();
    if (!Object.values(BindingTypeEnum).includes(upperType as BindingTypeEnum)) {
      throw new Error('Invalid binding type. Must be HARDCOVER, SOFTCOVER, or SPIRAL');
    }
    return new BindingType(upperType as BindingTypeEnum);
  }
}
