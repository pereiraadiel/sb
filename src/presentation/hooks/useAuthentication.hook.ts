import { create } from "zustand";
import { AuthenticateUsecaseFactory } from "@/domain/usecases/authenticate.usecase";

type useAuthentication = {
  authToken: string | null;
  authError: string | null;
  authStand: string;
  authFetching: boolean;
  authenticate: (code: string) => Promise<void>;
};

const useAuthentication = create<useAuthentication>((set) => {
  return {
    authToken: null,
    authError: null,
    authStand: "",
    authFetching: false,
    authenticate: async (code: string) => {
      try {
        set({ authError: null, authToken: null, authFetching: true });
        setTimeout(async () => {
          const { authToken, authStand } =
            await AuthenticateUsecaseFactory().execute(code);
          set({ authToken, authStand });
        }, 1000);
      } catch (error: any) {
        console.error(error);
        set({ authError: error.message });
      } finally {
        set({ authFetching: false });
      }
    },
  };
});

export default useAuthentication;
