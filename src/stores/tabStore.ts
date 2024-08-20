import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TabStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const useTabStore = create<TabStore>()(
  persist(
    (set) => ({
      activeTab: "link", // Default tab value
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "tab-storage",
    }
  )
);

export default useTabStore;
