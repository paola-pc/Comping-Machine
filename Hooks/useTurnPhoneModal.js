import { create } from 'zustand';

const useTurnPhoneModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useTurnPhoneModal;