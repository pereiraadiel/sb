import { create } from "zustand";
import { TicketEntity } from "@/domain/entities/ticket.entity";
import { GetTicketByQrCodeUsecaseFactory } from "@/domain/usecases/getTicketByQrCode.usecase";
import { GetTicketEmojisForAuthenticationUsecaseFactory } from "@/domain/usecases/getTicketEmojisForAuthentication.usecase";
import { AuthenticateTicketUsecaseFactory } from "@/domain/usecases/authenticateTicket.usecase";
import { EMOJIS } from "../../domain/utils/emoji.util";

type useTicket = {
  ticket: TicketEntity | null;
  ticketEmojis: Set<keyof typeof EMOJIS> | null;
  ticketError: string | null;
  ticketFetching: boolean;
  getTicketByQr: (code: string, authToken: string) => Promise<void>;
  getTicketEmojisForAuthentication: (
    qrCode: string,
    authToken: string
  ) => Promise<void>;
  authenticateTicket: (
    code: string,
    emoji: string,
    authToken: string
  ) => Promise<boolean>;
};

const useTicket = create<useTicket>((set) => {
  return {
    ticket: null,
    ticketEmojis: null,
    ticketError: null,
    ticketFetching: false,
    getTicketByQr: async (code: string, authToken: string) => {
      try {
        set({ ticketError: null, ticket: null, ticketFetching: true });
        setTimeout(async () => {
          const ticket = await GetTicketByQrCodeUsecaseFactory().execute(
            code,
            authToken
          );
          set({ ticket });
        }, 1000);
      } catch (error: any) {
        console.error(error);
        set({ ticketError: error.message });
      } finally {
        set({ ticketFetching: false });
      }
    },

    getTicketEmojisForAuthentication: async (
      qrCode: string,
      authToken: string
    ) => {
      try {
        set({ ticketError: null, ticket: null, ticketFetching: true });
        setTimeout(async () => {
          const ticketEmojis =
            await GetTicketEmojisForAuthenticationUsecaseFactory().execute(
              qrCode,
              authToken
            );
          set({ ticketEmojis });
        }, 1000);
      } catch (error: any) {
        console.error(error);
        set({ ticketError: error.message });
      } finally {
        set({ ticketFetching: false });
      }
    },

    authenticateTicket: async (
      code: string,
      emoji: string,
      authToken: string
    ) => {
      try {
        set({ ticketError: null, ticket: null, ticketFetching: true });
        return await AuthenticateTicketUsecaseFactory().execute(
          code,
          emoji,
          authToken
        );
      } catch (error: any) {
        console.error(error);
        set({ ticketError: error.message });
        return false;
      } finally {
        set({ ticketFetching: false });
      }
    },
  };
});

export default useTicket;
