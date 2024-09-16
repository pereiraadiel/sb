import { GoodEntity } from "./good.entity";

export class SaleStandEntity {
  id!: string;
  category!: string;
  fullname!: string;
  goods: GoodEntity[] = [];

  constructor(entity: SaleStandEntity) {
    Object.assign(this, entity);
  }
}
