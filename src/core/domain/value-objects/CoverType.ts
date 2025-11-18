export enum CoverTypeEnum {
  LEATHER = 'LEATHER',
  CLOTH = 'CLOTH',
  PAPER = 'PAPER'
}

export class CoverType {
  private constructor(readonly value: CoverTypeEnum) {}

  static create(type: string): CoverType {
    const upperType = type.toUpperCase();
    if (!Object.values(CoverTypeEnum).includes(upperType as CoverTypeEnum)) {
      throw new Error('Invalid cover type. Must be LEATHER, CLOTH, or PAPER');
    }
    return new CoverType(upperType as CoverTypeEnum);
  }
}
