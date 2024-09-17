import { ApiService } from "@/domain/services/api.service";
import { TicketEntity } from "@/domain/entities/ticket.entity";

export class GetTicketByQrCodeUsecase {
  constructor(private readonly apiService: ApiService) {}

  async execute(qrCode: string, authToken: string): Promise<TicketEntity> {
    try {
      console.warn("GetTicketByQrCodeUsecase: ", qrCode);
      return await this.apiService
        .useAuthentication(authToken)
        .getTicketByQrCode(qrCode);
    } catch (error) {
      console.error("GetTicketByQrCodeUsecase: ", error);
      throw error;
    }
  }
}

export const GetTicketByQrCodeUsecaseFactory = () => {
  const apiService = new ApiService();
  return new GetTicketByQrCodeUsecase(apiService);
};
