import { ApiService } from "@/domain/services/api.service";
import { TicketEntity } from "@/domain/entities/ticket.entity";

export class GetTicketByQrCodeUsecase {
  constructor(private readonly apiService: ApiService) {}

  async execute(qrCode: string): Promise<TicketEntity> {
    try {
      console.warn("GetTicketByQrCodeUsecase: ", qrCode);
      const random = Math.floor(Math.random() * 2);
      console.warn("Random: ", random);
      if (random) throw new Error("Fake error for testing, qrCode: " + qrCode);
      return await this.apiService.getTicketByQrCode(qrCode);
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
