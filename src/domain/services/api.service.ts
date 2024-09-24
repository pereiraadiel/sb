import { TicketEntity } from "@/domain/entities/ticket.entity";
import { EMOJIS } from "@/domain/utils/emoji.util";
import axios, { AxiosInstance } from "axios";
import { SaleStandEntity } from "../entities/saleStand.entity";

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://192.168.110.8:3000",
    });
  }

  useAuthentication(authToken: string) {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authToken}`;
    return this;
  }

  /**
   *
   * @param code
   * @returns the authentication response
   */
  async authenticate(code: string) {
    // do some api call
    // FAKE IMPLEMENTATION
    // return {
    //   authToken:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic3RhbmQiOiJQYXN0w6lpcyIsImlhdCI6MTUxNjIzOTAyMn0.yOfgFleyy2BWl2LA487B4gIK-7OuMdLdwMoTwVRibrs",
    //   stand: {
    //     id: "1",
    //     category: "Caixa",
    //     fullname: "Caixa",
    //     goods: [],
    //   },
    // };
    try {
      const response = await this.axiosInstance.post<{
        authToken: string;
        stand: SaleStandEntity;
      }>("/stands/auth", { code });
      console.log("authenticated stand: ", response.data);
      return response.data;
    } catch (error) {
      console.error("ApiService:authenticate: ", error);
      throw error;
    }
  }

  /**
   *
   * @param qrCode
   * @returns the ticket associated with the qrCode
   */
  async getTicketByQrCode(qrCode: string) {
    // do some api call
    // return new TicketEntity({
    //   id: "1",
    //   phoneNumber: "1234567890",
    //   physicalCode: qrCode,
    //   balance: 10000,
    // });
    try {
      const response = await this.axiosInstance.get<TicketEntity>(
        `/tickets/${qrCode}`
      );
      console.log("ticket: ", response.data);
      return response.data;
    } catch (error) {
      console.error("ApiService:getTicketByQrCode: ");
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param qrCode
   * @returns array of emoji codes for the ticket authentication transactions
   */
  async getTicketAuthEmojis(qrCode: string) {
    // do some api call
    // for now, return an random array of emojis
    // const randomIndex = Math.floor(Math.random() * Object.keys(EMOJIS).length);
    // return new Set(
    //   Object.keys(EMOJIS).slice(randomIndex, randomIndex + 6) as Array<
    //     keyof typeof EMOJIS
    //   >
    // );
    try {
      const response = await this.axiosInstance.get<Set<keyof typeof EMOJIS>>(
        `/tickets/${qrCode}/emojis`
      );
      console.log("emojis: ", response.data);
      return response.data;
    } catch (error) {
      console.error("ApiService:getTicketAuthEmojis: ");
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param qrCode
   * @param emoji
   * @returns true if the ticket is authenticated
   */
  async authenticateTicket(qrCode: string, emoji: string) {
    // do some api call
    // return true;
    try {
      const response = await this.axiosInstance.post<boolean>(
        `/tickets/${qrCode}/authenticate`,
        {
          emoji,
        }
      );
      return response.data;
    } catch (error) {
      console.error("ApiService:authenticateTicket: ", error);
      throw error;
    }
  }
}
