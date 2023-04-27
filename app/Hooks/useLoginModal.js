import { create } from 'zustand';
// zustand, light weight library for global state management, simpler than redux??

// Creation of the store:
const useLoginModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({isOpen : false})
}))

export default useLoginModal;