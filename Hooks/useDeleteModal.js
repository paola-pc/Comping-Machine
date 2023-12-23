import { create } from 'zustand';

const useDeleteModal = create((set) => ({
  isOpen: false,
  trackId: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setTrackId: (id) => set({trackId: id }) 
}))

export default useDeleteModal;