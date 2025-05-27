import { create } from "zustand";

interface UseAlert {
  isOpen: boolean;
  id: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useAlert = create<UseAlert>((set) => ({
  isOpen: false,
  id: null,
  onOpen: (id) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false, id: null }),
}));

export default useAlert;
