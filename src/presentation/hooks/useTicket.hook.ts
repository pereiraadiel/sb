import { create } from "zustand";
import { TicketEntity } from "@/domain/entities/ticket.entity";
import { GetTicketByQrCodeUsecaseFactory } from "@/domain/usecases/getTicketByQrCode.usecase";

type useTicket = {
  ticket: TicketEntity | null;
  ticketError: string | null;
  ticketFetching: boolean;
  getTicketByQr: (code: string, authToken: string) => Promise<void>;
};

const useTicket = create<useTicket>((set) => {
  return {
    ticket: null,
    ticketError: null,
    ticketFetching: false,
    getTicketByQr: async (code: string, authToken: string) => {
      try {
        set({ ticketError: null, ticket: null, ticketFetching: true });
        setTimeout(async () => {
          const ticket = await GetTicketByQrCodeUsecaseFactory().execute(code);
          set({ ticket });
        }, 1000);
      } catch (error: any) {
        console.error(error);
        set({ ticketError: error.message });
      } finally {
        set({ ticketFetching: false });
      }
    },
  };
});

export default useTicket;
