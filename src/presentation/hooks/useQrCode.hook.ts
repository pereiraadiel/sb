import { create } from "zustand";

type useQrCode = {
	qrCode: string;
	setQrCode: (qrCode: string) => void;
}

const useQrCode = create<useQrCode>((set) => {
	return {
		qrCode: "",
		setQrCode: (qrCode: string) => set({ qrCode }),
	};
});

export default useQrCode;