export class GoodEntity {
  id!: string;
  category!: string;
  fullname!: string;
  description!: string;
  priceCents!: number;

  constructor(entity: GoodEntity) {
    Object.assign(this, entity);
  }
}
