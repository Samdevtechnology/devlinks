import { create } from "zustand";

interface QRCodeStore {
  downloadQRCode: (() => void) | null;
  setDownloadQRCode: (func: () => void) => void;
}

export const useQRCodeStore = create<QRCodeStore>((set) => ({
  downloadQRCode: null,
  setDownloadQRCode: (func) => set({ downloadQRCode: func }),
}));
