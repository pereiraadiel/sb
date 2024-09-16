import { ApiService } from "@/domain/services/api.service";

export class AuthenticateUsecase {
  constructor(private readonly apiService: ApiService) {}

  async execute(code: string) {
    try {
      console.warn("AuthenticateUsecase: ", code);
      return await this.apiService.authenticate(code);
    } catch (error) {
      console.error("AuthenticateUsecase: ", error);
      throw error;
    }
  }
}

export const AuthenticateUsecaseFactory = () => {
  const apiService = new ApiService();
  return new AuthenticateUsecase(apiService);
};
