import { create } from "zustand";
import { AuthenticateUsecaseFactory } from "@/domain/usecases/authenticate.usecase";
import { SaleStandEntity } from "../../domain/entities/saleStand.entity";

type useAuthentication = {
  authToken: string | null;
  authError: string | null;
  stand: SaleStandEntity | null;
  authFetching: boolean;
  authenticate: (code: string) => Promise<void>;
  logout: () => void;
};

const useAuthentication = create<useAuthentication>((set) => {
  return {
    authToken: null,
    authError: null,
    stand: null,
    authFetching: false,

    authenticate: async (code: string) => {
      try {
        set({
          authError: null,
          authToken: null,
          authFetching: true,
          stand: null,
        });

        setTimeout(async () => {
          const { authToken, stand } =
            await AuthenticateUsecaseFactory().execute(code);
          set({ authToken, stand });
        }, 1000);
      } catch (error: any) {
        console.error(error);
        set({ authError: error.message });
      } finally {
        set({ authFetching: false });
      }
    },

    logout: () => {
      set({
        authToken: null,
        stand: null,
        authError: null,
        authFetching: false,
      });
    },
  };
});

export default useAuthentication;
