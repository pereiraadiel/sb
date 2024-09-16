import { ApiService } from "@/domain/services/api.service";

export class AuthenticateUsecase {
  constructor(private readonly apiService: ApiService) {}

  async execute(code: string) {
    try {
      console.warn("AuthenticateUsecase: ", code);
      const random = Math.floor(Math.random() * 2);
      console.warn("Random: ", random);
      if (random) throw new Error("Fake error for testing, code: " + code);
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
