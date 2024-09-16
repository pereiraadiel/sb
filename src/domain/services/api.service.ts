import { TicketEntity } from "@/domain/entities/ticket.entity";
import { GOODS } from "@/domain/utils/goods";

export class ApiService {
  async authenticate(code: string) {
    // do some api call
    // FAKE IMPLEMENTATION
    if (code === "123456") {
      return {
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic3RhbmQiOiJQYXN0w6lpcyIsImlhdCI6MTUxNjIzOTAyMn0.yOfgFleyy2BWl2LA487B4gIK-7OuMdLdwMoTwVRibrs",
        stand: {
          id: "1",
          category: "Caixa",
          fullname: "Caixa",
          goods: [],
        },
      };
    }
    if (code === "234567") {
      return {
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic3RhbmQiOiJQYXN0w6lpcyIsImlhdCI6MTUxNjIzOTAyMn0.yOfgFleyy2BWl2LA487B4gIK-7OuMdLdwMoTwVRibrs",
        stand: {
          id: "1",
          category: "Pastel",
          fullname: "Pastéis",
          goods: GOODS.filter((good) => good.category === "Pastel"),
        },
      };
    }
    if (code === "345678") {
      return {
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic3RhbmQiOiJQYXN0w6lpcyIsImlhdCI6MTUxNjIzOTAyMn0.yOfgFleyy2BWl2LA487B4gIK-7OuMdLdwMoTwVRibrs",
        stand: {
          id: "1",
          category: "Bebidas",
          fullname: "Bebidas",
          goods: GOODS.filter((good) => good.category === "Bebidas"),
        },
      };
    }
    return {
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic3RhbmQiOiJQYXN0w6lpcyIsImlhdCI6MTUxNjIzOTAyMn0.yOfgFleyy2BWl2LA487B4gIK-7OuMdLdwMoTwVRibrs",
      stand: {
        id: "1",
        category: "Aleatorio",
        fullname: "Aleatorio",
        goods: GOODS,
      },
    };
  }

  async getTicketByQrCode(qrCode: string) {
    // do some api call
    return new TicketEntity({
      id: "1",
      phoneNumber: "1234567890",
      physicalCode: qrCode,
      balance: 10000,
    });
  }
}
