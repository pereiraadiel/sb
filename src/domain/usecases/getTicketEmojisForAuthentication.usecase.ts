import { ApiService } from "@/domain/services/api.service";

export class GetTicketEmojisForAuthenticationUsecase {
  constructor(private readonly apiService: ApiService) {}

  async execute(qrCode: string, authToken: string) {
    try {
      console.warn("GetTicketEmojisForAuthenticationUsecase: ", qrCode);
      return await this.apiService
        .useAuthentication(authToken)
        .getTicketAuthEmojis(qrCode);
    } catch (error) {
      console.error("GetTicketEmojisForAuthenticationUsecase: ", error);
      throw error;
    }
  }
}

export const GetTicketEmojisForAuthenticationUsecaseFactory = () => {
  const apiService = new ApiService();
  return new GetTicketEmojisForAuthenticationUsecase(apiService);
};
