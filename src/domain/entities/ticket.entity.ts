export class TicketEntity {
  id!: string;
  physicalCode!: string;
  phoneNumber!: string;
  balance!: number;

  constructor(entity: TicketEntity) {
    Object.assign(this, entity);
  }
}
