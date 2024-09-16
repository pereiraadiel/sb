import { TicketEntity } from "@/domain/entities/ticket.entity";

export class ApiService {
  async authenticate(code: string) {
    // do some api call
    return {
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic3RhbmQiOiJQYXN0w6lpcyIsImlhdCI6MTUxNjIzOTAyMn0.yOfgFleyy2BWl2LA487B4gIK-7OuMdLdwMoTwVRibrs",
      authStand: "Pastéis",
    };
  }

  async getTicketByQrCode(qrCode: string) {
    // do some api call
    return new TicketEntity({
      id: "1",
      phoneNumber: "1234567890",
      physicalCode: qrCode,
      balance: 1000,
    });
  }
}
