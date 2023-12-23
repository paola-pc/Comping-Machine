import { create } from 'zustand';

const useSaveModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({isOpen : false})
}))

export default useSaveModal;