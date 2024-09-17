import { ApiService } from "@/domain/services/api.service";

export class AuthenticateTicketUsecase {
  constructor(private readonly apiService: ApiService) {}

  async execute(qrCode: string, emoji: string, authToken: string) {
    try {
      console.warn("AuthenticateTicketUsecase: ", emoji);
      return await this.apiService
        .useAuthentication(authToken)
        .authenticateTicket(qrCode, emoji);
    } catch (error) {
      console.error("AuthenticateTicketUsecase: ", error);
      throw error;
    }
  }
}

export const AuthenticateTicketUsecaseFactory = () => {
  const apiService = new ApiService();
  return new AuthenticateTicketUsecase(apiService);
};
