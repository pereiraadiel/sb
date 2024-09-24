export class TicketEntity {
  id!: string;
  physicalCode!: string;
  balance!: number;

  constructor(entity: TicketEntity) {
    Object.assign(this, entity);
  }
}
