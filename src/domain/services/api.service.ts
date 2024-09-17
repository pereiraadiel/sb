import { TicketEntity } from "@/domain/entities/ticket.entity";
import { GOODS } from "@/domain/utils/goods";
import { EMOJIS } from "@/domain/utils/emoji.util";

export class ApiService {
  /**
   *
   * @param code
   * @returns the authentication response
   */

  useAuthentication(authToken: string) {
    // inject the authToken in the service
    return this;
  }

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

  /**
   *
   * @param qrCode
   * @returns the ticket associated with the qrCode
   */
  async getTicketByQrCode(qrCode: string) {
    // do some api call
    return new TicketEntity({
      id: "1",
      phoneNumber: "1234567890",
      physicalCode: qrCode,
      balance: 10000,
    });
  }

  /**
   *
   * @param qrCode
   * @returns array of emoji codes for the ticket authentication transactions
   */
  async getTicketAuthEmojis(qrCode: string): Promise<Set<keyof typeof EMOJIS>> {
    // do some api call
    // for now, return an random array of emojis
    const randomIndex = Math.floor(Math.random() * Object.keys(EMOJIS).length);
    return new Set(
      Object.keys(EMOJIS).slice(randomIndex, randomIndex + 6) as Array<
        keyof typeof EMOJIS
      >
    );
  }

  /**
   *
   * @param qrCode
   * @param emoji
   * @returns true if the ticket is authenticated
   */
  async authenticateTicket(qrCode: string, emoji: string) {
    // do some api call
    return true;
  }
}
