import { create } from "zustand";

interface UseDialog<T = unknown> {
  isOpen: boolean;
  data: T | null;
  onOpen: (data?: T) => void;
  onClose: () => void;
}

function createDialogStore<T = unknown>() {
  return create<UseDialog<T>>((set) => ({
    isOpen: false,
    data: null,
    onOpen: (data) => set({ isOpen: true, data: data ?? null }),
    onClose: () => set({ isOpen: false, data: null }),
  }));
}

export default createDialogStore;